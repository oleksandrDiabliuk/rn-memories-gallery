import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const auth = StyleSheet.create({
  linearContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 100,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoWrapper: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  logoLetter: {
    color: COLORS.purple,
    fontWeight: 'bold',
    fontSize: 42,
  },
  logoLetterBottom: {
    marginTop: 16,
    marginLeft: -6,
  },
  title: {
    color: COLORS.white,
    fontSize: 32,
    marginTop: 16,
    fontWeight: '600',
  },
  formView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authFormContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    padding: 8,
    marginVertical: 16,
    color: COLORS.white,
  },
  bottomSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomText: {
    color: COLORS.white,
    marginBottom: 8,
  },
});
