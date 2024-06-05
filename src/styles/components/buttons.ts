import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const buttons = StyleSheet.create({
  authButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    minWidth: 200,
    shadowOpacity: .3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  authButtonTitle: {
    color: COLORS.purple,
    fontWeight: '600'
  },
  mainButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.purple,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    minWidth: 200,
    shadowOpacity: .3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  mainButtonTitle: {
    color: COLORS.white,
    fontWeight: '600'
  },
  activityIndicator: {
    marginLeft: 16,
  },
});
