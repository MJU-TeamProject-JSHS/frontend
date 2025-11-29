import React, { useEffect } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <Image
      source={require('../../../assets/Splash/Splashfull.png'
)}
      style={styles.image}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width,
    height,
  },
});
