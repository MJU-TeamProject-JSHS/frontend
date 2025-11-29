import React from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  Dimensions,
  ImageBackground,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const designWidth = 393;
const designHeight = 852;

const BUTTON_WIDTH = 345.58;
const BUTTON_HEIGHT = 55.99;
const BUTTON_H_MARGIN = (designWidth - BUTTON_WIDTH) / 2; 
const BUTTON_BOTTOM = 100; 

const { width, height } = Dimensions.get('window');
const scaleX = width / designWidth;
const scaleY = height / designHeight;

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  const onKakaoPress = async () => {
    // 기존 백엔드 / 카카오 로직은 이 함수 안에 그대로 두면 됨
    
    // const token = await kakaoLogin();
    // await api.post('/auth/kakao', { accessToken: token });
    navigation.navigate('MainTabs');
    console.log('kakao login');
  };


  const buttonStyle = {
    left: BUTTON_H_MARGIN * scaleX,
    right: BUTTON_H_MARGIN * scaleX,
    height: BUTTON_HEIGHT * scaleY,
    bottom: BUTTON_BOTTOM * scaleY,
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../../../assets/Splash/login2.png')} 
        style={styles.bg}
        resizeMode="cover"
      >
  
        <Pressable style={[styles.kakaoHitArea, buttonStyle]} onPress={onKakaoPress}>

          <Text style={styles.hiddenText}>카카오로 시작하기</Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  bg: {
    width,
    height,
  },
  kakaoHitArea: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    //위치 테스트
    // backgroundColor: 'rgba(255,0,0,0.3)',
  },
  hiddenText: {
    opacity: 0,
  },
});
