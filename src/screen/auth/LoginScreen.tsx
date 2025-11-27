// src/screen/auth/LoginScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const onKakaoPress = async () => {
    // TODO(backend): 카카오 로그인 성공 후 토큰을 백엔드로 전달
    // 1) 카카오 SDK login() 호출
    // 2) accessToken/idToken 받기
    // 3) api.post('/auth/kakao', { accessToken })
    navigation.navigate('MainTabs');
    console.log('kakao login');
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#615FFF', '#AD46FF', '#F6339A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[styles.glow, styles.glowBlue]} />
      <View style={[styles.glow, styles.glowCyan]} />
      <View style={[styles.glow, styles.glowPink]} />

      <View style={styles.top}>
        <View style={styles.logoOuter}>
          <View style={styles.logoInner}>
            <Text style={styles.logoText}>DDiNG</Text>
          </View>
        </View>

        <Text style={styles.title}>AI 학습 도우미</Text>
        <Text style={styles.desc}>공부를 더 쉽고 재미있게</Text>
      </View>

      <View style={styles.features}>
        <FeatureRow icon="cpu" title="AI 문제 생성" body="똑똑한 AI가 맞춤 문제를 만들어드려요" />
        <FeatureRow icon="book-open" title="스마트 암기" body="효율적인 학습으로 기억력 UP" />
        <FeatureRow icon="zap" title="빠른 학습" body="언제 어디서나 간편하게" />
      </View>

      <View style={styles.bottom}>
        <Pressable style={styles.kakaoBtn} onPress={onKakaoPress}>
          <View style={styles.kakaoIcon}>
            <Feather name="message-circle" size={18} color="#371D1E" />
          </View>
          <Text style={styles.kakaoText}>카카오로 시작하기</Text>
        </Pressable>

        <Text style={styles.footer}>
          계속 진행하면 DDiNG의 <Text style={styles.link}>이용약관</Text> 및{" "}
          <Text style={styles.link}>개인정보처리방침</Text>에 동의하게 됩니다
        </Text>
      </View>
    </View>
  );
}

function FeatureRow({ icon, title, body }: any) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>
        <Feather name={icon} size={18} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureBody}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between' },

  glow: { position: 'absolute', borderRadius: 9999 },
  glowBlue: { width: 288, height: 288, top: 70, left: 30, backgroundColor: 'rgba(81,162,255,0.35)' },
  glowCyan: { width: 320, height: 320, bottom: 110, left: 20, backgroundColor: 'rgba(0,211,243,0.28)' },
  glowPink: { width: 240, height: 240, top: 250, left: 80, backgroundColor: 'rgba(253,165,213,0.35)' },

  top: { alignItems: 'center', marginTop: 80, gap: 8 },
  logoOuter: {
    width: 112, height: 112, borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 2.8, borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  logoInner: {
    width: 88, height: 88, borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  logoText: { fontSize: 36, fontWeight: '900', color: '#fff' },

  title: { fontSize: 28, fontWeight: '900', color: '#fff', marginTop: 20 },
  desc: { fontSize: 16, color: 'rgba(255,255,255,0.9)' },

  features: { marginTop: 30, gap: 12 },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    borderWidth: 0.6,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    gap: 12,
  },
  featureIcon: {
    width: 40, height: 40, borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  featureTitle: { fontSize: 15, fontWeight: '700', color: '#fff' },
  featureBody: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },

  bottom: { marginBottom: 40, gap: 14 },
  kakaoBtn: {
    height: 56, borderRadius: 16,
    backgroundColor: '#FEE500',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 2,
  },
  kakaoIcon: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  kakaoText: { fontSize: 16, fontWeight: '700', color: '#371D1E' },

  footer: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: { textDecorationLine: 'underline' },
});
