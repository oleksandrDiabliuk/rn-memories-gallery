import React, { useRef } from "react";
import { StyleProp, ViewStyle } from 'react-native';
import Video, { VideoRef } from "react-native-video";
import { Button } from '../buttons';

type Props = {
  url: string;
  style: StyleProp<ViewStyle>;
  buttonStyle: StyleProp<ViewStyle>;
  onFullScreen?: (index: number) => void;
  index?: number;
};

export const VideoView = ({
  url,
  style,
  buttonStyle,
  onFullScreen,
  index
}: Props) => {
  const videoRef = useRef<VideoRef>(null);

  const handleVideoFullscreen = () => {
    if(onFullScreen)
      onFullScreen(index || 0);
    else
      videoRef?.current?.presentFullscreenPlayer();
  };
  const handleVideoFullscreenDismiss = () => {
    videoRef?.current?.dismissFullscreenPlayer();
  };

  return (
    <Button
      onPress={handleVideoFullscreen}
      style={buttonStyle}
    >
      <Video
        ref={videoRef}
        source={{uri: url}}
        style={style}
        controls
        onFullscreenPlayerDidDismiss={handleVideoFullscreenDismiss}
        resizeMode="contain"
        paused
      />
    </Button>
  );
};
