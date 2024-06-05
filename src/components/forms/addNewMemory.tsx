import React, { useState, useEffect, useRef } from "react";
import { ScrollView, View, Image } from "react-native";
import Video, { VideoRef } from "react-native-video";
import ImageCropPicker from 'react-native-image-crop-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { useIsFocused } from '@react-navigation/native';
import ImageView from "react-native-image-viewing";
import { InputText, DateInput } from '../inputs';
import { AuthButton, MainButton, Button } from '../buttons';
import { errorAlert } from '../../services/alert';
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
  const [fullscreen, setFullScreen] = useState<boolean>(false);
  const [mediaLoading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const videoRef = useRef<VideoRef>(null)

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
        // cropping: true,
        // forceJpg: true,
      });
      if (response.path) {
        const fileName = `${new Date().getTime()}.${response.mime.includes('video') ? response.mime.replace('video/', '') : response.mime.replace('image/', '')}`;
        console.log(fileName)
        const img = {
          data: response.path,
          filename: fileName,
          type: response.mime,
        }
        const allMediasForSend = [...mediaForSend];
        allMediasForSend.push(img);

        setMediaForSend(allMediasForSend);
      }
      setLoading(false);
      console.log(response)
    } catch(error) {
      setLoading(false);
      throw error;
    }
  };

  const launchGalleryFromCamera = async () => {
    try {
      setLoading(true);
      const result = await launchImageLibrary({
        mediaType: 'mixed',
        formatAsMp4: true,
        quality: 0.8,
        videoQuality: 'medium',
        maxWidth: 1024,
        selectionLimit: 1,
      });

      if (result.assets) {
        const res = result.assets[0];
        const img = {
          data: (res.uri || '').replace('file://', ''),
          filename: res.fileName,
          type: res.type,
        }
        const allMediasForSend = [...mediaForSend];
        allMediasForSend.push(img);

        setMediaForSend(allMediasForSend);
      } else {
        errorAlert(result.errorMessage || 'Something went wrong.');
      }
      setLoading(false);
    } catch(error: any) {
      setLoading(false);
      errorAlert(error);
    }
  };
  const handlePreview = (index: number) => {
    setVisibleIndex(index);
    setIsVisible(true);
  };
  const handleVideoFullscreen = () => {
    setFullScreen(true);
    videoRef?.current?.presentFullscreenPlayer();
  };
  const onImageIndexChange = (index: any) => {
    setVisibleIndex(index);
  };
  const handleDeleteImg = (index: number) => {
    const allMediasForSend = [...mediaForSend];
    allMediasForSend.splice(index, 1);
    setMediaForSend(allMediasForSend);
    setIsVisible(false);
    setVisibleIndex(0);
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
            <Button
              key={img.filename}
              style={{shadowRadius: 1, shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.4, marginVertical: 4}}
              onPress={handleVideoFullscreen}
              value={index}
            >
              <Video
                ref={videoRef}
                source={{uri: img.data}}
                style={{width: 100, height: 100, borderRadius: 10}}
              />
            </Button>
          ) : (
            <Button
              key={img.filename}
              style={{shadowRadius: 1, shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.4, marginVertical: 4}}
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
        images={mediaForSend.map(img => ({uri: img.data}))}
        imageIndex={visibleIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        FooterComponent={() => (
          <View style={{flexDirection: 'row', justifyContent: 'space-around', padding: 16, marginBottom: 16}}>
            <MainButton
              title="Edit"
              onPress={submit}
              style={{minWidth: 100, padding: 16}}
            />
            <AuthButton
              title="Delete"
              onPress={handleDeleteImg}
              value={visibleIndex}
              style={{minWidth: 100, padding: 16}}
              onImageIndexChange={onImageIndexChange}
            />
          </View>
        )}
      />
    </ScrollView>
  );
}
