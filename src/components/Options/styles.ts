import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
  },
  options: {
    width: '100%',
    marginBottom: 48,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 32,
    color: theme.colors.text_primary,
    fontFamily: theme.fonts.medium
  }
});