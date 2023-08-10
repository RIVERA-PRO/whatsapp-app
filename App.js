import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabsNavigation from './navigation/BottomTabsNavigation';
import { NavigationContainer } from '@react-navigation/native';
import ButonNewChat from './components/ButonNewChat';
export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BottomTabsNavigation />
        <ButonNewChat />
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,

  },
});
