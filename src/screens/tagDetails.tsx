import React, { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import ImageView from "react-native-image-viewing";
import { NavBar } from '../components/navBar/navbar';
import { Button } from '../components/buttons';
import { ROUTES } from '../constants';
import { tagDetails } from '../styles';

export const TagDetails = ({navigation, route}) => {
  const [visible, setIsVisible] = useState<boolean>(false);
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const {tag} = route.params;
  const tagTitle = Object.keys(tag)[0];

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

  return (
    <View style={tagDetails.container}>
      <NavBar
        title={`#${tagTitle}`}
        onProfile={onProfile}
        showBack
        onBack={handleBack}
      />
      <ScrollView>
        <View style={tagDetails.tagImagesContainer}>
          {tag[tagTitle].map((url: string, index: number) => (
            <Button
              onPress={handlePreview}
              key={index}
              value={index}
              style={tagDetails.tagImageContainer}
            >
              <Image
                source={{uri: url}}
                style={tagDetails.image}
                resizeMode="contain"
              />
            </Button>
          ))}
        </View>
      </ScrollView>
      <ImageView
        images={(tag[tagTitle] || []).map((img: string) => ({uri: img}))}
        imageIndex={visibleIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </View>
  )
};
