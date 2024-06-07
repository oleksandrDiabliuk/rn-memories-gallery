import React, { useState } from "react";
import { View, Text, Alert, Image, StyleProp, ImageStyle } from "react-native";
import ImageSlider from 'react-native-image-slider';
import ImageView from "react-native-image-viewing";
import { NavBar } from '../components/navBar/navbar';
import { MainButton, Button } from '../components/buttons';
import { VideoView } from '../components/video';
import { ROUTES } from '../constants';
import { RouteParamsListProps } from '../routes';
import { deleteMemory } from '../services/firebaseDB';
import { memoryDetails } from '../styles';

export const MemoryDetails = ({navigation, route}: RouteParamsListProps<ROUTES.MEMORY_DETAILS>) => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const {memory} = route.params;
  const handleBack = () => {
    navigation.goBack();
  };
  const handlePreview = (index: number) => {
    setVisibleIndex(index);
    setIsVisible(true);
  };
  const onProfile = () => {
    navigation.navigate(ROUTES.PROFILE);
  };
  const onSuccess = () => {
    navigation.goBack();
  };
  const handleDelete = () => {
    deleteMemory(memory, onSuccess);
  };
  const confirmDelete = () => {
    Alert.alert('Delete memory?', 'Are you sure you want to delete memory?', [{
      text: 'Yes',
      onPress: handleDelete,
      style: 'destructive',
    }, {
      text: 'No',
      style: 'cancel',
    }]);
  };

  const renderCustomSlide = ({
    item: image,
    style: imageStyle,
    index,
    width
  }: {
    item: string;
    style: StyleProp<ImageStyle>;
    index: number;
    width: number;
  }) => {
    return image.includes('mp4') ? (
      <VideoView
        url={image}
        buttonStyle={{alignItems: 'center'}}
        style={{width: width, height: '100%'}}
      />
    ) : (
      <Button
        onPress={handlePreview}
        value={index}
        style={{alignItems: 'center'}}
      >
        <Image
          source={{uri: image}}
          style={[
            imageStyle, {
              height: '100%',
              width: width - 32,
              alignSelf: 'center',
            }
          ]}
          resizeMode="contain"
        />
      </Button>
    );
  }

  return (
    <View style={memoryDetails.container}>
      <NavBar
        title={memory.title}
        onProfile={onProfile}
        showBack
        onBack={handleBack}
      />
      <View style={memoryDetails.memoryCard}>
        <View style={memoryDetails.sliderContainer}>
          <ImageSlider
            images={memory.urls}
            onPress={handlePreview}
            customSlide={renderCustomSlide}
            style={{maxHeight: 200, borderRadius: 10, margin: 12, width: '100%', alignSelf: 'center'}}
          />
        </View>
        <Text>{memory.description}</Text>
        <View style={memoryDetails.tags}>
          <Text style={memoryDetails.tagTitle}>Tags:</Text>
          {memory.tags.map((tag: string) => (
            <View key={tag} style={memoryDetails.tagContainer}>
              <Text style={memoryDetails.tag}>{`#${tag}`}</Text>
            </View>
          ))}
        </View>
        <MainButton
          title="Delete Memory"
          onPress={confirmDelete}
        />
      </View>
      <ImageView
        images={(memory.urls || []).filter((img: string) => !img.includes('mp4')).map((img: string) => ({uri: img}))}
        imageIndex={visibleIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  )
};
