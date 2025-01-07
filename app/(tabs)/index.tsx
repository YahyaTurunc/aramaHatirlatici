import { Image, StyleSheet, Platform, Button, Linking, Pressable, Text, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
// import * as Linking from 'expo-linking';
export default function HomeScreen() {
  const handleCall = () => {
    Linking.openURL('tel:1234567890');
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
      >
      <ThemedView className="">
        <TouchableOpacity 
        // onPress={handleCall}
        className="bg-blue-500 py-3 px-6 rounded-lg flex items-center justify-center">
        <Link href="/intro" className="text-white text-lg font-bold">Aramak için tıklayın</Link>
        </TouchableOpacity>
        <ThemedText className="text-center mt-10 text-black bg-slate-200 dark:bg-gray-700 p-4 rounded-lg">
          Merhaba, Dünya!af
        </ThemedText>
      </ThemedView>
     
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
