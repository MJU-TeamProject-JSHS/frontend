import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RotateCwIcon from '../../assets/svgs/RotateCwIcon';

type Props = {
  question: string;
  answer: string;
  cardNumber?: number;
};

export default function MemorizedNotes({ question, answer, cardNumber = 1 }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));

  const handleFlip = () => {
    const toValue = isFlipped ? 0 : 1;
    Animated.spring(flipAnim, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <View style={styles.container}>
      {/* 앞면 (질문) */}
      <Animated.View
        style={[
          styles.card,
          styles.cardFront,
          {
            opacity: frontOpacity,
            transform: [{ rotateY: frontInterpolate }],
          },
        ]}
      >
        <Pressable onPress={handleFlip} style={styles.cardPressable}>
          <LinearGradient
            colors={['#F43F5E', '#EC4899', '#F472B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.frontBadge}
          >
            <Text style={styles.badgeText}>앞면 (질문)</Text>
          </LinearGradient>

          <LinearGradient
            colors={['#F43F5E', '#EC4899', '#F472B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.numberBadge}
          >
            <Text style={styles.numberText}>{cardNumber}</Text>
          </LinearGradient>

          {/* [수정 포인트] textWrapper 제거, 텍스트 바로 배치 */}
          <View style={styles.contentContainer}>
            <Text style={styles.questionText}>{question}</Text>
          </View>

          <View style={styles.flipHint}>
            <RotateCwIcon size={16} color="#6a7282" />
            <Text style={styles.flipHintText}>카드를 탭하여 뒤집기</Text>
          </View>
        </Pressable>
      </Animated.View>

      {/* 뒷면 (답) */}
      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          {
            opacity: backOpacity,
            transform: [{ rotateY: backInterpolate }],
          },
        ]}
      >
        <Pressable onPress={handleFlip} style={styles.cardPressable}>
          <LinearGradient
            colors={['#00d492', '#00d5be']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.backBadge}
          >
            <Text style={styles.badgeText}>뒷면 (답)</Text>
          </LinearGradient>

          <LinearGradient
            colors={['#F43F5E', '#EC4899', '#F472B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.numberBadge}
          >
            <Text style={styles.numberText}>{cardNumber}</Text>
          </LinearGradient>

          {/* [수정 포인트] textWrapper 제거, 텍스트 바로 배치 */}
          <View style={styles.contentContainer}>
            <Text style={styles.answerText}>{answer}</Text>
          </View>

          <View style={styles.flipHint}>
            <RotateCwIcon size={16} color="#6a7282" />
            <Text style={styles.flipHintText}>카드를 탭하여 뒤집기</Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 0.582,
    borderColor: 'rgba(229, 231, 235, 0.5)',
    borderRadius: 24,
    padding: 24.58,
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    zIndex: 2,
  },
  cardBack: {
    zIndex: 1,
  },
  cardPressable: {
    flex: 1,
    width: '100%',
  },
  frontBadge: {
    height: 25.981,
    borderRadius: 19536000,
    paddingHorizontal: 12,
    paddingVertical: 4.74,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  backBadge: {
    height: 25.981,
    borderRadius: 19536000,
    paddingHorizontal: 12,
    paddingVertical: 4.74,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  numberBadge: {
    position: 'absolute',
    top: 2,
    right: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  // [수정] contentContainer 스타일 변경
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // 수직 중앙 정렬만 유지
    // alignItems: 'center' 제거 -> 기본값 stretch 사용
    width: '100%',
    paddingVertical: 10, // 텍스트 위아래 여백 확보
  },
  
  questionText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#1e2939',
    textAlign: 'center', // 텍스트 내부에서 중앙 정렬
    letterSpacing: -0.31,
    // width: '100%' 제거 (부모가 stretch이므로 자동 채움)
  },
  answerText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#1e2939',
    textAlign: 'center', // 텍스트 내부에서 중앙 정렬
    letterSpacing: -0.31,
    // width: '100%' 제거
  },
  flipHint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 'auto',
  },
  flipHintText: {
    fontSize: 13,
    lineHeight: 19.5,
    color: '#6a7282',
    letterSpacing: -0.08,
  },
});