import React, { useState, useEffect } from "react";
import { Text, ImageBackground, View } from "react-native";
import { Button } from '../buttons';
import { Tag } from '../../types';
import { getMediaUrl } from '../../services/firebaseDB';
import { tagItemStyles } from '../../styles';

type Props = {
  tagKey: string;
  images: string[];
  onDetails: (tag: Tag) => void;
};

export const TagItem = ({tagKey, images, onDetails}: Props) => {
  const [urls, setUrls] = useState<string[]>([]);

  const getUrls = async () => {
    const uris = [] as string[];
    images.forEach((url: string) => {
      getMediaUrl(url).then((uri: string) => {
        uris.push(uri);
        setUrls(uris);
      });
    });
  };

  useEffect(() => {
    getUrls();
  }, []);

  return (
    <Button onPress={onDetails} value={{[tagKey]: urls}}>
      {urls[0] && (
          <ImageBackground
            source={{uri: urls[0]}}
            style={tagItemStyles.tagContainer}
            imageStyle={tagItemStyles.tagImg}
            blurRadius={5}
          >
            <View style={tagItemStyles.imgOverflow}>
              <Text key={tagKey} style={tagItemStyles.tagTitle}>{`#${tagKey}`}</Text>
            </View>
          </ImageBackground>
      )}
    </Button>
  )
};
