import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import 'react-native-gesture-handler';
import { Widget } from './src/components/Widget';
import { theme } from './src/theme';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      
      <Widget />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
