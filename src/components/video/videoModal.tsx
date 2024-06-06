import React from "react";
import { Modal, View } from 'react-native';
import Video from 'react-native-video';
import { MainButton, AuthButton, Button } from '../buttons';
import { videoStyles } from '../../styles';

type Props = {
  isModalOpened: boolean;
  handleClose: () => void;
  url: string;
  handleEdit: () => void;
  handleDelete: (index: number) => void;
  index: number;
};

export const VideoModal = ({
  isModalOpened,
  handleClose,
  url,
  handleDelete,
  handleEdit,
}: Props) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isModalOpened}
      onDismiss={handleClose}
    >
      <Button style={videoStyles.modalContainer} onPress={handleClose}>
        <Video
          source={{uri: url}}
          style={videoStyles.video}
        />
        <View style={videoStyles.buttonsContainer}>
          <MainButton
            title="Edit"
            onPress={handleEdit}
            style={{minWidth: 100, padding: 16}}
          />
          <AuthButton
            title="Delete"
            onPress={handleDelete}
            style={{minWidth: 100, padding: 16, marginLeft: 16}}
          />
        </View>
      </Button>
    </Modal>
  );
};
