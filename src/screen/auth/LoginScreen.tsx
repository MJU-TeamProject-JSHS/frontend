import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  Dimensions,
  ImageBackground,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, KakaoOAuthToken } from '@react-native-seoul/kakao-login';
import { API_CONFIG, STORAGE_KEYS } from '../../config/authConfig';

const designWidth = 393;
const designHeight = 852;

const BUTTON_WIDTH = 345.58;
const BUTTON_HEIGHT = 55.99;
const BUTTON_H_MARGIN = (designWidth - BUTTON_WIDTH) / 2; 
const BUTTON_BOTTOM = 100; 

const { width, height } = Dimensions.get('window');
const scaleX = width / designWidth;
const scaleY = height / designHeight;

type JwtTokenResponse = {
  accessToken: string;
  refreshToken?: string;
  [key: string]: any;
};

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState(false);

  const exchangeKakaoToken = useCallback(
    async (kakaoTokens: KakaoOAuthToken): Promise<JwtTokenResponse> => {
      if (!kakaoTokens?.accessToken) {
        throw new Error("카카오 액세스 토큰을 받지 못했습니다.");
      }

      // 타임아웃 설정
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.REQUEST_TIMEOUT);

      try {
        console.log("백엔드 토큰 교환 요청:", API_CONFIG.KAKAO_LOGIN_ENDPOINT);
        const response = await fetch(API_CONFIG.KAKAO_LOGIN_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken: kakaoTokens.accessToken,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response
            .text()
            .catch(() => "응답을 읽을 수 없습니다");
          console.error("백엔드 토큰 교환 실패:", {
            status: response.status,
            statusText: response.statusText,
            response: errorText.substring(0, 200),
          });
          throw new Error(
            `백엔드 토큰 교환에 실패했습니다: ${response.status} ${response.statusText}`
          );
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          console.error("JSON이 아닌 응답:", {
            contentType,
            response: text.substring(0, 200),
          });
          throw new Error(
            `서버가 JSON이 아닌 응답을 반환했습니다: ${contentType}`
          );
        }

        return response.json();
      } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === "AbortError") {
          throw new Error(
            "서버 응답 시간이 초과되었습니다. 네트워크 연결을 확인해주세요."
          );
        }
        throw error;
      }
    },
    []
  );

  const processLoginTokens = useCallback(async (tokens: JwtTokenResponse) => {
    if (!tokens || !tokens.accessToken) {
      throw new Error("백엔드에서 액세스 토큰을 받지 못했습니다.");
    }

    // 기본 토큰 저장
    await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    if (tokens.refreshToken) {
      await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    }

    console.log("[LoginScreen] 로그인 토큰 저장 완료");
  }, []);

  const onKakaoPress = useCallback(async () => {
    try {
      setIsLoading(true);

      console.log("카카오 로그인 시작...");

      // login 함수가 존재하는지 확인
      if (typeof login !== "function") {
        throw new Error(
          "카카오 로그인 모듈이 제대로 로드되지 않았습니다. 앱을 재시작해주세요."
        );
      }

      let kakaoTokens: KakaoOAuthToken | null = null;
      try {
        console.log("카카오 login() 함수 호출 시작...");
        
        // 타임아웃을 위한 Promise 래퍼
        const loginPromise = login();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("카카오 로그인 타임아웃: 응답을 받지 못했습니다.")), 60000)
        );
        
        const result = await Promise.race([loginPromise, timeoutPromise]) as any;
        console.log("카카오 로그인 응답 받음 - 타입:", typeof result);
        console.log("카카오 로그인 응답:", JSON.stringify(result, null, 2));

        // result가 유효한지 확인
        if (result === null || result === undefined) {
          throw new Error("카카오 로그인이 취소되었거나 실패했습니다.");
        }

        // result가 객체인지 확인
        if (typeof result !== "object" || Array.isArray(result)) {
          throw new Error(
            `카카오 로그인 응답 형식이 올바르지 않습니다. 타입: ${typeof result}`
          );
        }

        kakaoTokens = result as KakaoOAuthToken;

        // accessToken이 있는지 확인
        if (!kakaoTokens.accessToken) {
          const keys = Object.keys(kakaoTokens);
          console.error(
            "kakaoTokens에 accessToken이 없습니다. 사용 가능한 키:",
            keys
          );
          throw new Error(
            `카카오 액세스 토큰이 없습니다. 응답 키: ${keys.join(", ")}`
          );
        }
      } catch (loginError: any) {
        console.error("카카오 login() 함수 오류 상세:", {
          message: loginError?.message,
          toString: loginError?.toString(),
          stack: loginError?.stack,
          error: loginError,
        });

        // "Cannot read property" 계열 에러인 경우
        if (
          loginError?.message?.includes("Cannot read") ||
          loginError?.message?.includes("Cannot read prop")
        ) {
          throw new Error(
            "카카오 로그인 모듈 초기화 오류. 앱을 완전히 종료한 후 다시 시작해주세요."
          );
        }

        throw new Error(
          `카카오 로그인 실패: ${
            loginError?.message ||
            loginError?.toString() ||
            "알 수 없는 오류"
          }`
        );
      }

      // kakaoTokens가 null이면 에러
      if (!kakaoTokens || !kakaoTokens.accessToken) {
        throw new Error("카카오 로그인 토큰을 가져오지 못했습니다.");
      }

      const tokens = await exchangeKakaoToken(kakaoTokens);

      if (!tokens || !tokens.accessToken) {
        throw new Error("백엔드에서 액세스 토큰을 받지 못했습니다.");
      }

      await processLoginTokens(tokens);
      console.log("카카오 로그인 및 토큰 처리 완료");

      // 로그인 성공 시 메인 탭으로 이동
      navigation.navigate('MainTabs');
    } catch (error: any) {
      console.error("카카오 로그인 오류", error);
      const errorMessage =
        error?.message || error?.toString() || "알 수 없는 오류가 발생했습니다.";
      Alert.alert(
        "로그인 오류",
        errorMessage.includes("Cannot read")
          ? "카카오 로그인 초기화에 문제가 있습니다. 앱을 재시작해주세요."
          : errorMessage
      );
    } finally {
      setIsLoading(false);
    }
  }, [exchangeKakaoToken, navigation, processLoginTokens]);


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
  
        <Pressable 
          style={[styles.kakaoHitArea, buttonStyle]} 
          onPress={onKakaoPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#371D1E" />
          ) : (
            <Text style={styles.hiddenText}>카카오로 시작하기</Text>
          )}
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
