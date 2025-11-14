import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import SparklesIcon from '../../assets/svgs/SparklesIcon';
import DDingLogo from '../../components/global/DDingLogo';

export default function ProblemLoading() {
  // 회전
  const rotate = useRef(new Animated.Value(0)).current;
  // 중앙 이중 원 펄스
  const outerPulse = useRef(new Animated.Value(1)).current;
  const innerPulse = useRef(new Animated.Value(1)).current;
  // 아이콘 펄스
  const iconPulse = useRef(new Animated.Value(1)).current;
  // 바운싱 점
  const bounce1 = useRef(new Animated.Value(0)).current;
  const bounce2 = useRef(new Animated.Value(0)).current;
  const bounce3 = useRef(new Animated.Value(0)).current;
  // 진행 바
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createPulseAnim = (value: Animated.Value) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, { toValue: 0.5, duration: 1000, useNativeDriver: true }),
          Animated.timing(value, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      );

    const createBounceAnim = (value: Animated.Value) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: -6,
            duration: 500,
            easing: Easing.bezier(0.8, 0, 1, 1),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 500,
            easing: Easing.bezier(0, 0, 0.2, 1),
            useNativeDriver: true,
          }),
        ])
      );

    const rotateAnim = Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 2400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    const outerAnim = createPulseAnim(outerPulse);
    const innerAnim = createPulseAnim(innerPulse);
    const iconAnim = createPulseAnim(iconPulse);
    const bounceAnim1 = createBounceAnim(bounce1);
    const bounceAnim2 = createBounceAnim(bounce2);
    const bounceAnim3 = createBounceAnim(bounce3);

    const progressAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(progressWidth, {
          toValue: 0.7,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(progressWidth, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(progressWidth, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    );

    const animations = [rotateAnim, outerAnim, innerAnim, iconAnim, progressAnim];
    const timeouts: NodeJS.Timeout[] = [];

    animations.forEach((anim) => anim.start());
    bounceAnim1.start();
    const timeout2 = setTimeout(() => bounceAnim2.start(), 200);
    const timeout3 = setTimeout(() => bounceAnim3.start(), 400);
    timeouts.push(timeout2, timeout3);

    return () => {
      animations.forEach((anim) => anim.stop());
      bounceAnim1.stop();
      bounceAnim2.stop();
      bounceAnim3.stop();
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [rotate, outerPulse, innerPulse, iconPulse, bounce1, bounce2, bounce3, progressWidth]);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const progressPercentage = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={styles.safe}>
      {/* 강조 페이지: 진한 톤 그라데이션 - 디자인 시스템 규칙 */}
      <LinearGradient
        colors={['#6366f1', '#a855f7', '#ec4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject as any}
      />

      {/* 상단 중앙 DDING 로고 (화이트) */}
      <View style={styles.logoWrap}>
        <DDingLogo color="white" />
      </View>

      <View style={styles.centerWrap}>
        {/* 회전 링 + 중앙 이중 원: 동일 중심으로 정렬 */}
        <View style={styles.dial}>
          <Animated.View style={[styles.ringWrap, { transform: [{ rotate: spin }] }]}>
            <Svg width="100%" height="100%" viewBox="0 0 240 240">
              <Circle cx={120} cy={120} r={112} stroke="rgba(255,255,255,0.2)" strokeWidth={6} fill="none" />
              <Circle cx={120} cy={120} r={112} stroke="white" strokeWidth={6} fill="none" strokeDasharray="180 520" strokeLinecap="round" />
            </Svg>
          </Animated.View>
          <Animated.View style={{ opacity: outerPulse }}>
            <View style={styles.outerCircleBlur}>
              <Animated.View style={{ opacity: innerPulse }}>
                <View style={styles.innerCircleBlur}>
                  <Animated.View style={{ opacity: iconPulse }}>
                    <SparklesIcon size={48} color="#FFFFFF" />
                  </Animated.View>
                </View>
              </Animated.View>
            </View>
          </Animated.View>
        </View>

        {/* 텍스트 */}
        <View style={styles.texts}>
          <Text style={styles.title}>AI가 문제를 생성 중입니다</Text>
          <Text style={styles.sub}>파일을 분석하고 핵심 개념을 추출하는 중...</Text>
          {/* 로딩 점 3개 */}
          <View style={styles.dotsContainer}>
            <Animated.View style={[styles.dot, { transform: [{ translateY: bounce1 }] }]} />
            <Animated.View style={[styles.dot, styles.dotSpacing, { transform: [{ translateY: bounce2 }] }]} />
            <Animated.View style={[styles.dot, styles.dotSpacing, { transform: [{ translateY: bounce3 }] }]} />
          </View>
        </View>

        {/* 진행 바 */}
        <View style={styles.progressTrack}>
          <View style={styles.progressBlur}>
            <Animated.View style={[styles.progressFill, { width: progressPercentage }]} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoWrap: {
    position: 'absolute',
    top: '22%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dial: {
    width: 240,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  outerCircleBlur: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircleBlur: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texts: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  sub: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  dotSpacing: {
    marginLeft: 8,
  },
  progressTrack: {
    marginTop: 28,
    width: 300,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  progressBlur: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
  },
});