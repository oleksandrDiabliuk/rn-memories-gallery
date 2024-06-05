import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const inputs = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.purple,
    padding: 8,
    marginVertical: 16,
    color: COLORS.purple,
  },
  multiline: {
    borderWidth: 1,
    borderColor: COLORS.purple,
    minHeight: 100,
  },
  dateInputText: {
    color: COLORS.purple,
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 16,
  },
  search: {
    flex: 1,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  searchIconContainer: {
    padding: 8,
    backgroundColor: COLORS.purple,
    borderRadius: 20,
    marginLeft: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});
