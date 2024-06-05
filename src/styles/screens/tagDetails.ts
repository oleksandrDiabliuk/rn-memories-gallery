import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const tagDetails = StyleSheet.create({
  container: {
    flex: 1,
  },
  tagImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  tagImageContainer: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    margin: 8,
    borderRadius: 10,
    maxWidth: '90%',
  },
  image: {
    minWidth: '50%',
    maxWidth: '100%',
    height: 200,
    borderRadius: 10,
  },
});
