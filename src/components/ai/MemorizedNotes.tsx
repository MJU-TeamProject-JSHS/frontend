import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import RotateCwIcon from '../../assets/svgs/RotateCwIcon';

type Props = {
  question: string; // 앞면에 표시될 질문 텍스트
  answer: string; // 뒷면에 표시될 답변 텍스트
  cardNumber?: number; // 카드 번호 (기본값: 1)
};

export default function MemorizedNotes({ question, answer, cardNumber = 1 }: Props) {
  // 카드 뒤집기 상태 관리
  const [isFlipped, setIsFlipped] = useState(false);
  // 애니메이션 값 (0: 앞면, 1: 뒷면)
  const [flipAnim] = useState(new Animated.Value(0));

  /**
   * 카드 뒤집기 핸들러
   */
  const handleFlip = () => {
    const toValue = isFlipped ? 0 : 1;
    Animated.spring(flipAnim, {
      toValue,
      friction: 8, // 마찰력 (낮을수록 더 많이 튕김)
      tension: 10, // 장력 (높을수록 더 빠름)
      useNativeDriver: true, // 네이티브 드라이버 사용으로 성능 최적화
    }).start();
    setIsFlipped(!isFlipped);
  };

  // 앞면 회전 각도 보간 (0deg → 180deg)
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // 뒷면 회전 각도 보간 (180deg → 360deg)
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  // 앞면 투명도 보간 (0.5 지점에서 완전히 사라짐)
  const frontOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0, 0],
  });

  // 뒷면 투명도 보간 (0.5 지점에서 완전히 나타남)
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
          {/* 상단 왼쪽: 앞면 배지 */}
          <LinearGradient
            colors={['#F43F5E', '#EC4899', '#F472B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.frontBadge}
          >
            <Text style={styles.badgeText}>앞면 (질문)</Text>
          </LinearGradient>

          {/* 상단 오른쪽: 번호 배지 */}
          <LinearGradient
            colors={['#F43F5E', '#EC4899', '#F472B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.numberBadge}
          >
            <Text style={styles.numberText}>{cardNumber}</Text>
          </LinearGradient>

          {/* 질문 텍스트 */}
          <View style={styles.contentContainer}>
            <Text style={styles.questionText}>{question}</Text>
          </View>

          {/* 하단: 뒤집기 안내 */}
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
          {/* 상단 왼쪽: 뒷면 배지 */}
          <LinearGradient
            colors={['#00d492', '#00d5be']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.backBadge}
          >
            <Text style={styles.badgeText}>뒷면 (답)</Text>
          </LinearGradient>

          {/* 상단 오른쪽: 번호 배지 */}
          <LinearGradient
            colors={['#F43F5E', '#EC4899', '#F472B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.numberBadge}
          >
            <Text style={styles.numberText}>{cardNumber}</Text>
          </LinearGradient>

          {/* 답변 텍스트 */}
          <View style={styles.contentContainer}>
            <Text style={styles.answerText}>{answer}</Text>
          </View>

          {/* 하단: 뒤집기 안내 */}
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  questionText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#1e2939',
    textAlign: 'center',
    letterSpacing: -0.31,
  },
  answerText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#1e2939',
    textAlign: 'center',
    letterSpacing: -0.31,
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

