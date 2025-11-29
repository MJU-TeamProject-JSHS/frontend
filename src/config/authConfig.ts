/**
 * 인증 관련 설정 파일
 * 환경 변수나 설정을 중앙에서 관리합니다.
 */

// 백엔드 API 베이스 URL
const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  "https://volubly-uncorroboratory-consuelo.ngrok-free.dev";

// 백엔드 API 엔드포인트
export const API_CONFIG = {
  // 기본 API 베이스 URL
  BASE_URL,
  
  // 카카오 로그인 토큰 교환 엔드포인트
  KAKAO_LOGIN_ENDPOINT:
    process.env.EXPO_PUBLIC_KAKAO_MOBILE_LOGIN_URL ||
    `${BASE_URL}/auth/login/kakao`,
  
  // API 요청 타임아웃 (밀리초)
  REQUEST_TIMEOUT: 10000,
};

// 카카오 SDK 설정
export const KAKAO_CONFIG = {
  // 카카오 앱키 (네이티브 설정에서 사용)
  // Android: AndroidManifest.xml에 설정 필요
  // iOS: Info.plist에 설정 필요
  APP_KEY: process.env.EXPO_PUBLIC_KAKAO_APP_KEY || "cdadd132cca054ab593a0b44c54e038e",
  
  // 리다이렉트 URI (네이티브 앱에서는 보통 필요 없음)
  // 카카오 개발자 콘솔에 패키지 이름 기반으로 등록되어 있으면 자동으로 사용됨
  REDIRECT_URI: process.env.EXPO_PUBLIC_KAKAO_REDIRECT_URI || "",
};

// AsyncStorage 키
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "@auth/accessToken",
  REFRESH_TOKEN: "@auth/refreshToken",
};

