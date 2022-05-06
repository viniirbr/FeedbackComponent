import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Widget from './src/components/Widget';
import { theme } from './src/theme';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import 'react-native-gesture-handler';

export default function App() {
  const [fontsLoaded] = useFonts({
    InterMedium: require('./assets/Inter-Medium.ttf'),
    InterRegular: require('./assets/Inter-Regular.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background
    }}>
      <StatusBar
        style='light'
        backgroundColor='transparent'
        translucent />
      <Widget />
    </View>
  );
}
