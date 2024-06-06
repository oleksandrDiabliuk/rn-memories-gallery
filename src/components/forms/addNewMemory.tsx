import React, { useState, useEffect } from "react";
import { ScrollView, View, Image } from "react-native";
import ImageCropPicker from 'react-native-image-crop-picker';
import ImageEditor from '@thienmd/react-native-image-editor';
import { VESDK } from 'react-native-videoeditorsdk';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import { useIsFocused } from '@react-navigation/native';
import ImageView from "react-native-image-viewing";
import { VideoView } from '../video';
import { InputText, DateInput } from '../inputs';
import { VideoModal } from '../video';
import { AuthButton, MainButton, Button } from '../buttons';
import { MemoryCreate, Attachment } from '../../types';
import { HASHTAG_REGEX } from '../../constants';
import { addNewMemory } from '../../styles';

type Props = {
  loading: boolean;
  handleCreate: (memory: MemoryCreate) => void;
};

export const AddNewMemoryForm = ({loading, handleCreate}: Props) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [allTags, setAllTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [mediaForSend, setMediaForSend] = useState<Attachment[]>([]);
  const [visible, setIsVisible] = useState<boolean>(false);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const [mediaLoading, setLoading] = useState<boolean>(false);
  const [fullScreenVideo, setFullScreenVideo] = useState<boolean>(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setTitle("");
      setTags("");
      setAllTags([]);
      setDescription("");
      setDate(null);
      setMediaForSend([]);
    }
  }, [isFocused]);

  const submit = () => {
    handleCreate({
      title,
      tags: allTags,
      description,
      date: date || new Date(),
      mediaForSend,
    });
  };

  const onChangeTags = (newTags: string) => {
    const hashtags = newTags?.toLowerCase().match(HASHTAG_REGEX) || [];
    if (hashtags) {
      const arr = [] as string[];
      hashtags.forEach((item) => arr.push(item.substring(1)));
      setTags(newTags)
      setAllTags(arr);
    }
  };

  const library = async () => {
    try {
      setLoading(true);
      const response = await ImageCropPicker.openPicker({
        mediaType: 'any',
        smartAlbums: ['UserLibrary', 'Panoramas', 'Videos', 'Bursts'],
        compressVideoPreset: 'MediumQuality',
        compressImageMaxHeight: 720,
        compressImageMaxWidth: 720,
      });
      if (response.path) {
        const fileName = `${new Date().getTime()}.${response.mime.includes('video') ? response.mime.replace('video/', '') : response.mime.replace('image/', '')}`;
        const img = {
          data: response.path,
          filename: fileName,
          type: response.mime,
        }
        const allMediasForSend = [...mediaForSend];
        allMediasForSend.push(img);

        setMediaForSend(allMediasForSend);

        let photoPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

        RNFetchBlob.config({fileCache: true})
          .fetch('GET', response.sourceURL || '')
          .then((resp: {path: () => string}) => {
            RNFS.moveFile(resp.path(), photoPath)
              .then(() => {
                console.log('FILE WRITTEN!');
              })
              .catch((err) => {
                console.log('Move file error: ', err.message);
              });
          })
          .catch((err: {message: any}) => {
            console.log('Get file error: ', err.message);
          });
      }
      setLoading(false);
    } catch(error) {
      setLoading(false);
      throw error;
    }
  };

  const handlePreview = (index: number) => {
    setVisibleIndex(index);
    setIsVisible(true);
  };
  const handleDeleteImg = (index: number) => {
    const allMediasForSend = [...mediaForSend];
    allMediasForSend.splice(index, 1);
    setMediaForSend(allMediasForSend);
    setFullScreenVideo(false);
    setIsVisible(false);
    setVisibleIndex(0);
  };
  const onFullScreen = (index: number) => {
    setFullScreenVideo(true);
    setVisibleIndex(index);
  };
  const onFullScreenDismiss = () => {
    setFullScreenVideo(false);
  };
  const onEdit = () => {
    ImageEditor.Edit({
      path: `${RNFS.CachesDirectoryPath}/${mediaForSend[visibleIndex].filename}`,
      languages: {},
      onDone: (img: string) => {
        const newMediaForSend = [...mediaForSend];
        newMediaForSend[visibleIndex] = {
          ...newMediaForSend[visibleIndex],
          data: img,
        };
        setMediaForSend(newMediaForSend);
      },
      onCancel: (code) => {
        console.log(code)
      }
    });
  };
  const onEditVideo = () => {
    onFullScreenDismiss();
    VESDK.openEditor(`${RNFS.CachesDirectoryPath}/${mediaForSend[visibleIndex].filename}`, {
      export: {
        video: {
          quality: 0.2,
        },
      },
    }).then(
      (result) => {
        const photoPath = `${RNFS.CachesDirectoryPath}/edited_${mediaForSend[visibleIndex].filename}`;

        RNFetchBlob.config({fileCache: true})
          .fetch('GET', result?.video || '')
          .then((resp: {path: () => string}) => {
            RNFS.moveFile(resp.path(), photoPath)
              .then(() => {
                console.log('FILE WRITTEN!');
              })
              .catch((err) => {
                console.log('Move file error: ', err.message);
              });
          })
          .catch((err: {message: any}) => {
            console.log('Get file error: ', err.message);
          });
        const newMediaForSend = [...mediaForSend];
        newMediaForSend[visibleIndex] = {
          ...newMediaForSend[visibleIndex],
          data: result?.video || newMediaForSend[visibleIndex].data,
        };
        setMediaForSend(newMediaForSend);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  return (
    <ScrollView contentContainerStyle={addNewMemory.formContainer}>
      <View style={addNewMemory.formInputs}>
        <InputText
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <InputText
          placeholder="Tags (#tag)"
          autoCapitalize="none"
          value={tags}
          onChangeText={onChangeTags}
        />
        <DateInput
          date={date || new Date()}
          setDate={setDate}
        />
        <InputText
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <MainButton
          title="Add Images"
          onPress={library}
          disabled={mediaLoading}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 16, flexWrap: 'wrap'}}>
          {mediaForSend.map((img, index) => img.type?.includes('mp4') ? (
            <VideoView
              key={img.filename}
              url={img.data}
              buttonStyle={{
                shadowRadius: 1,
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.4,
                marginVertical: 4,
                width: 100, height: 100
              }}
              style={{width: 100, height: 100}}
              onFullScreen={onFullScreen}
              index={index}
            />
          ) : (
            <Button
              key={img.filename}
              style={{
                shadowRadius: 1,
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.4,
                marginVertical: 4,
              }}
              onPress={handlePreview}
              value={index}
            >
              <Image source={{uri: img.data}} style={{width: 100, height: 100, borderRadius: 10}} />
            </Button>
          ))}
        </View>
      </View>
      <AuthButton
        title="Add New Memory"
        disabled={loading}
        onPress={submit}
      />
      <ImageView
        images={mediaForSend.filter((img: Attachment) => !img.data.includes('mp4')).map(img => ({uri: img.data}))}
        imageIndex={visibleIndex}
        visible={visible}
        onImageIndexChange={setVisibleIndex}
        onRequestClose={() => setIsVisible(false)}
        FooterComponent={() => (
          <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 16, marginBottom: 16}}>
            <MainButton
              title="Edit"
              onPress={onEdit}
              style={{minWidth: 100, padding: 16}}
            />
            <AuthButton
              title="Delete"
              onPress={handleDeleteImg}
              value={visibleIndex}
              style={{minWidth: 100, padding: 16}}
            />
          </View>
        )}
      />
      <VideoModal
        url={mediaForSend[visibleIndex]?.data || ''}
        isModalOpened={fullScreenVideo}
        handleClose={onFullScreenDismiss}
        handleDelete={handleDeleteImg}
        handleEdit={onEditVideo}
        index={visibleIndex}
      />
    </ScrollView>
  );
}
