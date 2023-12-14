import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FirstScreen } from './FrameWork/Screens/Intro';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <FirstScreen />
    </View>
  );
}