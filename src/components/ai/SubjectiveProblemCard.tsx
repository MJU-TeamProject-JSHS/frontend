import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FileQuestionIcon from '../../assets/svgs/FileQuestionIcon';
import SparklesIcon from '../../assets/svgs/SparklesIcon';
import ChevronDownIcon from '../../assets/svgs/ChevronDownIcon';

/**
 * SubjectiveProblemCard - 주관식 문제 카드 컴포넌트
 * 주관식 답안을 입력할 수 있는 문제 카드
 */
type Props = {
  problem: string; // 문제 텍스트
  problemNumber?: number; // 문제 번호 (기본값: 1)
  modelAnswer?: string; // 모범 답안
};

export default function SubjectiveProblemCard({
  problem,
  problemNumber = 1,
  modelAnswer,
}: Props) {
  // 답안 입력 텍스트
  const [answer, setAnswer] = useState('');
  // 모범 답안 펼침/접힘 상태
  const [isExpanded, setIsExpanded] = useState(false);
  // 모범 답안 토글 애니메이션
  const [rotateAnim] = useState(new Animated.Value(0));

  /**
   * 모범 답안 펼치기/접기 토글 핸들러
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

  // 모범 답안 토글 아이콘 회전 애니메이션
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.card}>
      {/* 문제 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* 문제 번호 배지 */}
          <LinearGradient
            colors={['#51A2FF', '#7C86FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.numberBadge}
          >
            <Text style={styles.numberText}>{problemNumber}</Text>
          </LinearGradient>
          {/* 문제 텍스트 */}
          <View style={styles.problemTextContainer}>
            <Text style={styles.problemText}>{problem}</Text>
          </View>
        </View>
      </View>

      {/* 답안 입력 영역 */}
      <View style={styles.answerSection}>
        <View style={styles.answerInputContainer}>
          <Text style={styles.answerLabel}>내 답안</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="답안을 작성해주세요..."
              placeholderTextColor="#99a1af"
              multiline
              value={answer}
              onChangeText={setAnswer}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* 모범 답안 섹션 */}
        {modelAnswer && (
          <View style={styles.modelAnswerContainer}>
            <Pressable onPress={toggleExpand} style={styles.modelAnswerHeader}>
              <View style={styles.modelAnswerHeaderLeft}>
                <View style={styles.modelAnswerIconContainer}>
                  <SparklesIcon size={14} color="#6366F1" />
                </View>
                <Text style={styles.modelAnswerTitle}>모범 답안</Text>
              </View>
              <Animated.View style={{ transform: [{ rotate }] }}>
                <ChevronDownIcon size={20} color="#364153" />
              </Animated.View>
            </Pressable>

            {isExpanded && (
              <View style={styles.modelAnswerContent}>
                <Text style={styles.modelAnswerText}>{modelAnswer}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 0.582,
    borderColor: 'rgba(229, 231, 235, 0.5)',
    borderRadius: 20,
    padding: 20.578,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 15.993,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 12,
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numberText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    lineHeight: 19.5,
    letterSpacing: -0.08,
  },
  problemTextContainer: {
    flex: 1,
  },
  problemText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 24.375,
    color: '#1e2939',
    letterSpacing: -0.23,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerSection: {
    gap: 15.993,
    paddingTop: 16.575,
    borderTopWidth: 0.582,
    borderTopColor: 'rgba(229, 231, 235, 0.5)',
  },
  answerInputContainer: {
    gap: 8,
  },
  answerLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#364153',
    letterSpacing: -0.08,
    lineHeight: 19.5,
  },
  textAreaContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 0.582,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    minHeight: 120,
  },
  textArea: {
    fontSize: 14,
    lineHeight: 21,
    color: '#364153',
    letterSpacing: -0.15,
    padding: 16,
    minHeight: 120,
  },
  modelAnswerContainer: {
    borderWidth: 0.582,
    borderColor: '#c7d2fe',
    borderRadius: 16,
    padding: 16.575,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  modelAnswerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modelAnswerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modelAnswerIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelAnswerTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e2939',
    letterSpacing: -0.08,
  },
  modelAnswerContent: {
    marginTop: 8,
  },
  modelAnswerText: {
    fontSize: 14,
    lineHeight: 22.75,
    color: '#364153',
    letterSpacing: -0.15,
  },
});

