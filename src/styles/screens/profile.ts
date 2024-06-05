import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const profile = StyleSheet.create({
  headingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    color: COLORS.white,
  },
  headEmailContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    marginVertical: 16,
    paddingBottom: 8,
  },
  headEmail: {
    fontSize: 22,
    color: COLORS.white,
  },
});
