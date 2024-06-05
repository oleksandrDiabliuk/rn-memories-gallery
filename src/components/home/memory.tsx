import React, { useState, useEffect } from "react";
import { View, ImageBackground, Text } from 'react-native';
import Video, { VideoRef } from "react-native-video";
import moment from "moment";
import { Button } from '../buttons';
import { Memory } from '../../types';
import { DATE_FORMATS } from '../../constants';
import { getMediaUrl } from '../../services/firebaseDB';
import { memory as style } from '../../styles';

type Props = {
  memory: Memory;
  onDetails: (memory: Memory) => void;
}

export const MemoryItem = ({memory, onDetails}: Props) => {
  const [url, setUrl] = useState('');
  const [urls, setUrls] = useState<string[]>([]);
  const {media_urls, title, date, tags, id} = memory;

  const getUrl = async () => {
    const uri = await getMediaUrl(media_urls[0]);
    const uris = [] as string[];
    setUrl(uri);

    media_urls.forEach((url: string) => {
      getMediaUrl(url).then((uri: string) => {
        uris.push(uri);
        setUrls(uris);
      });
    });
  };

  useEffect(() => {
    getUrl();
  }, []);

  return url ? (
    <Button onPress={onDetails} value={{...memory, urls}}>
      {(url.includes('mp4') || url.includes('mov')) ? (
        <View style={style.videoContainer}>
          <Video
            source={{uri: url}}
            style={style.video}
          />
          <View style={style.titleContainer}>
            <Text style={style.title}>{title}</Text>
          </View>
          <View style={style.bottomContainer}>
            <View style={style.tagsContainer}>
              {tags.map(tag => (
                <View key={tag} style={style.tagContainer}>
                  <Text style={style.tag}>{`#${tag}`}</Text>
                </View>
              ))}
            </View>
            <Text style={style.date}>{moment(date).format(DATE_FORMATS.dd_mm_yyyy)}</Text>
          </View>
        </View>
      ) : (
        <ImageBackground
          source={{uri: url}}
          style={style.container}
          imageStyle={style.img}
          resizeMode="cover"
        >
          <View style={style.titleContainer}>
            <Text style={style.title}>{title}</Text>
          </View>
          <View style={style.bottomContainer}>
            <View style={style.tagsContainer}>
              {tags.map(tag => (
                <View key={tag} style={style.tagContainer}>
                  <Text style={style.tag}>{`#${tag}`}</Text>
                </View>
              ))}
            </View>
            <Text style={style.date}>{moment(date).format(DATE_FORMATS.dd_mm_yyyy)}</Text>
          </View>
        </ImageBackground>
      )}
    </Button>
  ) : null;
};
