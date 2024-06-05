import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const memoryDetails = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  memoryCard: {
    marginHorizontal: 16,
    alignItems: 'center',
    flex: 1,
  },
  description: {
    color: COLORS.textDark,
    fontSize: 10,
  },
  tags: {
    flexDirection: 'row',
    marginVertical: 16,
    alignItems: 'center',
  },
  tagTitle: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '500',
  },
  tagContainer: {
    padding: 2,
    backgroundColor: COLORS.white,
    marginHorizontal: 8,
  },
  tag: {
    fontSize: 12,
    color: COLORS.textDark,
  },
});
