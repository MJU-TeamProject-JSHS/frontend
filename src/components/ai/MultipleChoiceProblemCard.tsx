import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FileQuestionIcon from '../../assets/svgs/FileQuestionIcon';
import CheckCircle2Icon from '../../assets/svgs/CheckCircle2Icon';
import XIcon from '../../assets/svgs/XIcon';
import SparklesIcon from '../../assets/svgs/SparklesIcon';
import ChevronDownIcon from '../../assets/svgs/ChevronDownIcon';

/**
 * MultipleChoiceProblemCard - 객관식 문제 카드 컴포넌트
 * A, B, C, D 중 하나를 선택할 수 있는 객관식 문제 카드
 */
type Props = {
  problem: string; // 문제 텍스트
  choices: [string, string, string, string]; // A, B, C, D 선택지
  correctAnswer: 'A' | 'B' | 'C' | 'D'; // 정답
  problemNumber?: number; // 문제 번호 (기본값: 1)
  explanation?: string; // 해설 텍스트
};

export default function MultipleChoiceProblemCard({
  problem,
  choices,
  correctAnswer,
  problemNumber = 1,
  explanation,
}: Props) {
  // 선택된 답안 (null: 미선택, 'A' | 'B' | 'C' | 'D')
  const [selectedChoice, setSelectedChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  // 해설 펼침/접힘 상태
  const [isExpanded, setIsExpanded] = useState(false);
  // 해설 토글 애니메이션
  const [rotateAnim] = useState(new Animated.Value(0));

  /**
   * 선택지 클릭 핸들러
   * 한 번 선택하면 다시 변경할 수 없도록 함
   */
  const handleSelectChoice = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (selectedChoice === null) {
      setSelectedChoice(choice);
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
  const isCorrect = selectedChoice === correctAnswer;
  // 답안 선택 여부
  const hasAnswered = selectedChoice !== null;

  const choiceLabels = ['A', 'B', 'C', 'D'] as const;

  return (
    <View style={styles.card}>
      {/* 문제 헤더 */}
      <View style={styles.header}>
        <LinearGradient
          colors={['#6366f1', '#a855f7', '#ec4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.iconContainer}
        >
          <FileQuestionIcon size={20} color="#FFFFFF" />
        </LinearGradient>
        <Text style={styles.problemNumber}>문제 {problemNumber}</Text>
      </View>

      {/* 문제 텍스트 */}
      <View style={styles.problemContainer}>
        <Text style={styles.problemText}>{problem}</Text>
      </View>

      {/* 선택지 */}
      <View style={styles.choicesContainer}>
        {choiceLabels.map((label, index) => {
          // 선택된 답안이 있고, 이 선택지가 정답인지 확인
          const isCorrectChoice = hasAnswered && label === correctAnswer;
          // 선택된 답안이 있고, 이 선택지가 선택되었지만 오답인지 확인
          const isIncorrectSelected = hasAnswered && selectedChoice === label && !isCorrect;
          // 선택된 답안이 있고, 이 선택지가 선택되었고 정답인지 확인
          const isCorrectSelected = hasAnswered && selectedChoice === label && isCorrect;

          return (
            <Pressable
              key={label}
              onPress={() => handleSelectChoice(label)}
              disabled={hasAnswered} // 답안을 선택한 후에는 비활성화
              style={({ pressed }) => [
                styles.choiceItem,
                isCorrectSelected && styles.choiceItemSelected,
                !isCorrectSelected && !isIncorrectSelected && styles.choiceItemDefault,
                pressed && !hasAnswered && styles.choiceItemPressed,
                // 정답인 선택지 강조 표시
                isCorrectChoice && styles.choiceItemCorrect,
                // 오답으로 선택된 선택지 표시
                isIncorrectSelected && styles.choiceItemIncorrect,
              ]}
            >
              {isCorrectSelected || isIncorrectSelected ? (
                <LinearGradient
                  colors={
                    isCorrectSelected
                      ? ['#ECFDF5', '#F0FDFA'] // 정답: 초록색 그라데이션
                      : ['#FEF2F2', '#FFF1F2'] // 오답: 빨간색 그라데이션
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.choiceGradient}
                >
                  <View style={styles.choiceContent}>
                    <Text style={styles.choiceLabel}>{label}.</Text>
                    <Text style={styles.choiceText}>{choices[index]}</Text>
                  </View>
                </LinearGradient>
              ) : (
                <View style={[styles.choiceContent, styles.choiceContentDefault]}>
                  <Text style={styles.choiceLabel}>{label}.</Text>
                  <Text style={styles.choiceText}>{choices[index]}</Text>
                  {/* 정답인 선택지 표시 (다른 선택지를 선택했을 때) */}
                  {isCorrectChoice && (
                    <View style={styles.correctIndicator}>
                      <CheckCircle2Icon size={16} color="#10B981" />
                    </View>
                  )}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* 정답/오답 결과 표시 영역 */}
      {hasAnswered && (
        <View style={styles.resultContainer}>
          <LinearGradient
            colors={
              isCorrect
                ? ['#ECFDF5', '#F0FDFA'] // 정답: emerald-50 to teal-50
                : ['#FEF2F2', '#FFF1F2'] // 오답: red-50 to rose-50
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
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
                    내 답: {selectedChoice} / 정답: {correctAnswer}
                  </Text>
                )}
              </View>
            </View>
          </LinearGradient>

          {/* 해설 토글 버튼 - 답안을 선택했을 때 표시 */}
          {hasAnswered && explanation && (
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
          {isExpanded && hasAnswered && explanation && (
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
    borderRadius: 24,
    padding: 20.58,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  problemNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e2939',
    letterSpacing: -0.31,
  },
  problemContainer: {
    marginBottom: 16,
  },
  problemText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#1e2939',
    letterSpacing: -0.23,
  },
  choicesContainer: {
    gap: 8,
    marginBottom: 16,
  },
  choiceItem: {
    borderRadius: 14,
    borderWidth: 0.582,
    overflow: 'hidden',
  },
  choiceItemDefault: {
    backgroundColor: 'rgba(249, 250, 251, 0.5)',
    borderColor: '#e5e7eb',
  },
  choiceItemSelected: {
    borderColor: 'transparent',
  },
  // 정답인 선택지 강조 스타일 (다른 선택지를 선택했을 때)
  choiceItemCorrect: {
    borderColor: '#10B981',
    borderWidth: 2,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  // 오답으로 선택된 선택지 스타일
  choiceItemIncorrect: {
    borderColor: '#FB2C36',
    borderWidth: 1,
  },
  choiceItemPressed: {
    opacity: 0.8,
  },
  // 정답 표시 아이콘 컨테이너
  correctIndicator: {
    marginLeft: 'auto',
  },
  choiceGradient: {
    paddingVertical: 12.58,
    paddingHorizontal: 12.58,
  },
  choiceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  choiceContentDefault: {
    paddingVertical: 12.58,
    paddingHorizontal: 12.58,
  },
  choiceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4a5565',
    letterSpacing: -0.08,
    width: 20,
  },
  choiceText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#364153',
    letterSpacing: -0.08,
    flex: 1,
  },
  choiceLabelSelected: {
    color: '#FFFFFF',
  },
  choiceTextSelected: {
    color: '#FFFFFF',
  },
  // 정답/오답 결과 표시 영역
  resultContainer: {
    gap: 12,
    marginTop: 8,
  },
  // 정답/오답 박스
  resultBox: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16.575,
    // 그림자 효과 (shadow-lg)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8, // Android 그림자
  },
  // 정답 박스 스타일
  resultBoxCorrect: {
    borderColor: '#10B981', // emerald-500
    shadowColor: '#D1FAE5', // emerald-100
  },
  // 오답 박스 스타일
  resultBoxIncorrect: {
    borderColor: '#EF4444', // red-500
    shadowColor: '#FEE2E2', // red-100
  },
  // 결과 내용 컨테이너
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  // 결과 아이콘 컨테이너
  resultIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 체크 아이콘 컨테이너 (초록색 원형 배경)
  checkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // X 아이콘 컨테이너 (원형 배경)
  xIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F43F5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 결과 텍스트 컨테이너
  resultTextContainer: {
    flex: 1,
  },
  // 결과 제목
  resultTitle: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19.5,
    letterSpacing: -0.08,
    marginBottom: 4,
  },
  // 정답 제목 스타일
  resultTitleCorrect: {
    color: '#10B981',
  },
  // 오답 제목 스타일
  resultTitleIncorrect: {
    color: '#c10007',
  },
  // 결과 부제목 (내 답/정답 표시)
  resultSubText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#4a5565',
  },
  // 해설 토글 버튼
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
  // 해설 토글 버튼 텍스트
  explanationToggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#364153',
    letterSpacing: -0.15,
  },
  // 해설 컨테이너
  explanationContainer: {
    borderWidth: 0.582,
    borderColor: '#c7d2fe',
    borderRadius: 16,
    padding: 16.575,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  // 해설 헤더
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  // 해설 아이콘 컨테이너
  explanationIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 해설 제목
  explanationTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e2939',
    letterSpacing: -0.08,
  },
  // 해설 텍스트
  explanationText: {
    fontSize: 14,
    lineHeight: 22.75,
    color: '#364153',
    letterSpacing: -0.15,
  },
});

