import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const memory = StyleSheet.create({
  img: {
    borderRadius: 10,
  },
  container: {
    minHeight: 200,
    padding: 8,
    margin: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    justifyContent: 'space-between',
  },
  videoContainer: {
    position: 'relative',
    minHeight: 200,
    padding: 8,
    margin: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    justifyContent: 'space-between',
  },
  video: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  titleContainer: {
    padding: 8,
    backgroundColor: COLORS.white,
    textAlign: 'center',
    alignSelf: 'flex-start',
    borderRadius: 6,
  },
  title: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagsContainer: {
    flexDirection: 'row',
  },
  tagContainer: {
    backgroundColor: COLORS.white,
    marginRight: 8,
    padding: 2,
  },
  tag: {
    color: COLORS.textDark,
    fontSize: 12,
  },
  date: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
  },
});
