import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const tagItemStyles = StyleSheet.create({
  tagContainer: {
    width: 150,
    height: 150,
    margin: 8,
    marginVertical: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  imgOverflow: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagImg: {
    borderRadius: 8,
  },
  tagTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
});