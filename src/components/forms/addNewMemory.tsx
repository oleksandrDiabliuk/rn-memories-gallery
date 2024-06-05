import React, { useState, useEffect } from "react";
import { ScrollView, View, Image } from "react-native";
import ImageCropPicker from 'react-native-image-crop-picker';
import { useIsFocused } from '@react-navigation/native';
import ImageView from "react-native-image-viewing";
import { VideoView } from '../video';
import { InputText, DateInput } from '../inputs';
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
              onPress={submit}
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
    </ScrollView>
  );
}
