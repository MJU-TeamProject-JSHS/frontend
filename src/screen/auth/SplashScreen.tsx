import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#615FFF', '#AD46FF', '#F6339A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bg}
      />

      <View style={styles.blurBlue} />
      <View style={styles.blurCyan} />
      <View style={styles.blurPink} />

      <View style={styles.whiteOverlay} />

      <View style={styles.logoOuter}>
        <View style={styles.logoInner}>
          <Text style={styles.logoText}>DDiNG</Text>
        </View>
      </View>

      <View style={styles.subTitleWrap}>
        <View style={styles.iconBoxLeft} />
        <Text style={styles.subText}>AI 학습 도우미</Text>
        <View style={styles.iconBoxRight} />
      </View>

      <View style={styles.dotWrap}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
  },

  blurBlue: {
    position: 'absolute',
    width: 288,
    height: 288,
    left: 40,
    top: 80,
    backgroundColor: 'rgba(81,162,255,0.3)',
    opacity: 0.93,
    borderRadius: 20000,
    filter: 'blur(64px)',
  },
  blurCyan: {
    position: 'absolute',
    width: 320,
    height: 320,
    left: 33,
    top: 452,
    backgroundColor: 'rgba(0,211,243,0.3)',
    opacity: 0.57,
    borderRadius: 20000,
    filter: 'blur(64px)',
  },
  blurPink: {
    position: 'absolute',
    width: 256,
    height: 256,
    left: 69,
    top: 298,
    backgroundColor: 'rgba(253,165,213,0.3)',
    opacity: 0.57,
    borderRadius: 20000,
    filter: 'blur(64px)',
  },

  whiteOverlay: {
    position: 'absolute',
    width: 394,
    height: 852,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  logoOuter: {
    position: 'absolute',
    width: 160,
    height: 160,
    left: 116,
    top: 318,
    borderRadius: 20000,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 3.5,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInner: {
    width: 128,
    height: 128,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -0.85,
  },

  subTitleWrap: {
    position: 'absolute',
    top: 510,
    left: 122,
    width: 148,
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBoxLeft: {
    width: 20,
    height: 20,
    borderWidth: 1.6,
    borderColor: 'rgba(255,255,255,0.9)',
    opacity: 0.93,
  },
  iconBoxRight: {
    width: 20,
    height: 20,
    borderWidth: 1.6,
    borderColor: 'rgba(255,255,255,0.9)',
    opacity: 0.57,
  },
  subText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    letterSpacing: -0.31,
  },

  dotWrap: {
    position: 'absolute',
    top: 762,
    left: 174,
    flexDirection: 'row',
    gap: 8,
    opacity: 0.97,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
});
