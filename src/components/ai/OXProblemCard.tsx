import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CheckCircle2Icon from '../../assets/svgs/CheckCircle2Icon';
import XIcon from '../../assets/svgs/XIcon';
import SparklesIcon from '../../assets/svgs/SparklesIcon';
import ChevronDownIcon from '../../assets/svgs/ChevronDownIcon';

/**
 * OXProblemCard - OX 문제 카드 컴포넌트
 * O(정답) 또는 X(오답)를 선택할 수 있는 문제 카드
 */
type Props = {
  problem: string; // 문제 텍스트
  correctAnswer: 'O' | 'X'; // 정답
  problemNumber?: number; // 문제 번호 (기본값: 1)
  explanation?: string; // 해설 텍스트
};

export default function OXProblemCard({
  problem,
  correctAnswer,
  problemNumber = 1,
  explanation,
}: Props) {
  // 선택된 답안 (null: 미선택, 'O' 또는 'X')
  const [selectedAnswer, setSelectedAnswer] = useState<'O' | 'X' | null>(null);
  // 해설 펼침/접힘 상태
  const [isExpanded, setIsExpanded] = useState(false);
  // 해설 토글 애니메이션
  const [rotateAnim] = useState(new Animated.Value(0));

  /**
   * O 버튼 클릭 핸들러
   */
  const handleSelectO = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer('O');
    }
  };

  /**
   * X 버튼 클릭 핸들러
   */
  const handleSelectX = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer('X');
    }
  };

  /**
   * 해설 펼치기/접기 토글 핸들러
   */
  const toggleExpand = () => {
    const toValue = isExpanded ? 0 : 1;
    Animated.timing(rotateAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setIsExpanded(!isExpanded);
  };

  // 해설 토글 아이콘 회전 애니메이션
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // 정답 여부 확인
  const isCorrect = selectedAnswer === correctAnswer;
  // 답안 선택 여부
  const hasAnswered = selectedAnswer !== null;

  return (
    <View style={styles.card}>
      {/* 문제 번호 배지 - 우측 상단 */}
      <LinearGradient
        colors={['#10B981', '#14B8A6', '#06B6D4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.numberBadge}
      >
        <Text style={styles.numberText}>{problemNumber}</Text>
      </LinearGradient>

      {/* 문제 텍스트 */}
      <View style={styles.problemContainer}>
        <Text style={styles.problemText}>{problem}</Text>
      </View>

      {/* O/X 선택 버튼 영역 */}
      {!hasAnswered ? (
        <View style={styles.choicesContainer}>
          {/* O 버튼 */}
          <Pressable onPress={handleSelectO} style={styles.choiceButton}>
            <LinearGradient
              colors={['#10B981', '#14B8A6', '#06B6D4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.choiceGradient}
            >
              <CheckCircle2Icon size={24} color="#FFFFFF" />
              <Text style={styles.choiceText}>O</Text>
            </LinearGradient>
          </Pressable>

          {/* X 버튼 */}
          <Pressable onPress={handleSelectX} style={styles.choiceButton}>
            <LinearGradient
              colors={['#F43F5E', '#EC4899', '#F472B6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.choiceGradient}
            >
              <XIcon size={24} color="#FFFFFF" strokeWidth={3} />
              <Text style={styles.choiceText}>X</Text>
            </LinearGradient>
          </Pressable>
        </View>
      ) : (
        <View style={styles.resultContainer}>
          {/* 정답/오답 표시 영역 */}
          <View
            style={[
              styles.resultBox,
              isCorrect ? styles.resultBoxCorrect : styles.resultBoxIncorrect,
            ]}
          >
            <View style={styles.resultContent}>
              {/* 아이콘 */}
              <View style={styles.resultIconContainer}>
                {isCorrect ? (
                  <View style={styles.checkIconContainer}>
                    <CheckCircle2Icon size={40} color="#FFFFFF" />
                  </View>
                ) : (
                  <View style={styles.xIconContainer}>
                    <XIcon size={40} color="#FFFFFF" strokeWidth={4} />
                  </View>
                )}
              </View>
              {/* 텍스트 */}
              <View style={styles.resultTextContainer}>
                <Text
                  style={[
                    styles.resultTitle,
                    isCorrect ? styles.resultTitleCorrect : styles.resultTitleIncorrect,
                  ]}
                >
                  {isCorrect ? '정답입니다' : '오답입니다'}
                </Text>
                {!isCorrect && (
                  <Text style={styles.resultSubText}>
                    내 답: {selectedAnswer} / 정답: {correctAnswer}
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* 해설 토글 버튼 */}
          {explanation && (
            <Pressable onPress={toggleExpand} style={styles.explanationToggle}>
              <Text style={styles.explanationToggleText}>
                {isExpanded ? '해설 닫기' : '해설 보기'}
              </Text>
              <Animated.View style={{ transform: [{ rotate }] }}>
                <ChevronDownIcon size={20} color="#364153" />
              </Animated.View>
            </Pressable>
          )}

          {/* 해설 섹션 */}
          {isExpanded && explanation && (
            <View style={styles.explanationContainer}>
              <View style={styles.explanationHeader}>
                <View style={styles.explanationIconContainer}>
                  <SparklesIcon size={14} color="#6366F1" />
                </View>
                <Text style={styles.explanationTitle}>해설</Text>
              </View>
              <Text style={styles.explanationText}>{explanation}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 0.582,
    borderColor: 'rgba(229, 231, 235, 0.5)',
    borderRadius: 20,
    padding: 20.58,
    width: '100%',
    position: 'relative',
  },
  numberBadge: {
    position: 'absolute',
    top: 16.57,
    right: 16.57,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 19.5,
    letterSpacing: -0.08,
  },
  problemContainer: {
    marginTop: 4,
    marginBottom: 20,
    paddingRight: 40,
  },
  problemText: {
    fontSize: 15,
    lineHeight: 24.375,
    color: '#1e2939',
    letterSpacing: -0.23,
  },
  choicesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  choiceButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  choiceGradient: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  choiceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 27,
    letterSpacing: -0.44,
  },
  resultContainer: {
    gap: 12,
    marginTop: 4,
  },
  resultBox: {
    borderRadius: 16,
    borderWidth: 0.582,
    padding: 16.575,
  },
  resultBoxCorrect: {
    borderColor: '#a7f3d0',
    backgroundColor: 'rgba(209, 250, 229, 0.3)',
  },
  resultBoxIncorrect: {
    borderColor: '#ffc9c9',
    backgroundColor: 'rgba(255, 228, 230, 0.3)',
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F43F5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTextContainer: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19.5,
    letterSpacing: -0.08,
    marginBottom: 4,
  },
  resultTitleCorrect: {
    color: '#10B981',
  },
  resultTitleIncorrect: {
    color: '#c10007',
  },
  resultSubText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#4a5565',
  },
  explanationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 0.582,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    padding: 16.57,
  },
  explanationToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#364153',
    letterSpacing: -0.15,
  },
  explanationContainer: {
    borderWidth: 0.582,
    borderColor: '#c7d2fe',
    borderRadius: 16,
    padding: 16.575,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  explanationIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  explanationTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e2939',
    letterSpacing: -0.08,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 22.75,
    color: '#364153',
    letterSpacing: -0.15,
  },
});

