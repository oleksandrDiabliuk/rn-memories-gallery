import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

export const navbar = StyleSheet.create({
  container: {
    padding: 8,
    paddingTop: 68,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    minHeight: 250,
  },
  wrapper: {
    flexDirection: 'row',
    position:  'relative',
  },
  rect: {
    transform: [{rotateZ: '45deg'}],
    borderWidth: 1,
    borderColor: COLORS.pink,
    opacity: .4,
    borderRadius: 5,
    flex: 1,
    width: 100,
    height: 100,
  },
  titleContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    padding: 16,
  },
  titleWrapper: {
    // position: 'absolute',
    alignItems: 'center',
    top: '40%',
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  iconButton: {
    position: 'absolute',
    top: 0,
    padding: 16,
  },
  iconButtonLeft: {
    left: 0,
  },
  iconButtonRight: {
    right: 0,
  },
});
