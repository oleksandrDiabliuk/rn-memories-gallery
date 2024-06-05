import React, { useState, useEffect } from "react";
import { View, Text, Alert, Image, StyleProp, ImageStyle } from "react-native";
import ImageSlider from 'react-native-image-slider';
import ImageView from "react-native-image-viewing";
import { NavBar } from '../components/navBar/navbar';
import { MainButton, Button } from '../components/buttons';
import { ROUTES } from '../constants';
import { deleteMemory, getMediaUrl } from '../services/firebaseDB';
import { memoryDetails } from '../styles';

export const MemoryDetails = ({navigation, route}) => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const [urls, setUrls] = useState<string[]>([]);
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
    deleteMemory(memory.id, onSuccess);
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
  const getUrls = async () => {
    const uris = [] as string[];
    memory.media_urls.forEach((url: string) => {
      getMediaUrl(url).then(uri => {
        uris.push(uri);
        setUrls(uris);
      });
    });
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
    return (
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

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <View style={memoryDetails.container}>
      <NavBar
        title={memory.title}
        onProfile={onProfile}
        showBack
        onBack={handleBack}
      />
      <View style={memoryDetails.memoryCard}>
        <ImageSlider
          images={urls}
          onPress={handlePreview}
          customSlide={renderCustomSlide}
          style={{maxHeight: 200, borderRadius: 10, margin: 12, width: '100%', alignSelf: 'center'}}
        />
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
        images={(urls || []).map(img => ({uri: img}))}
        imageIndex={visibleIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  )
};
