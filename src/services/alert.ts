import {Alert} from 'react-native';

export const errorAlert = (text: string) => {
  Alert.alert('Error!', text);
};

export const successAlert = (text: string) => {
  Alert.alert('Success!', text);
};
