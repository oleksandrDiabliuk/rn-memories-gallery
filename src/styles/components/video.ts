import { StyleSheet } from 'react-native';

export const videoStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    marginBottom: 16,
  },
  video: {
    width: '90%',
    height: 200,
    margin: 16,
    borderRadius: 10,
  },
});
