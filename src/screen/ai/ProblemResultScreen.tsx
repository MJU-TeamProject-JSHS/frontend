import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import DDingLogo from '../../components/global/DDingLogo';
import SparklesIcon from '../../assets/svgs/SparklesIcon';
import ChevronLeftIcon from '../../assets/svgs/ChevronLeftIcon';
import { useNavigation } from '@react-navigation/native';
import MultipleChoiceProblemCard from '../../components/ai/MultipleChoiceProblemCard';
import MemorizedNotes from '../../components/ai/MemorizedNotes';
import OXProblemCard from '../../components/ai/OXProblemCard';
import SubjectiveProblemCard from '../../components/ai/SubjectiveProblemCard';

// 문제 유형 타입 정의
type ProblemType = 'multiple_choice' | 'subjective' | 'ox' | 'memorized';

// 문제 데이터 타입 정의
type ProblemData = 
  | {
      type: 'multiple_choice';
      id: string | number;
      problem: string;
      choices: [string, string, string, string];
      correctAnswer: 'A' | 'B' | 'C' | 'D';
      problemNumber?: number;
      explanation?: string;
    }
  | {
      type: 'subjective';
      id: string | number;
      problem: string;
      problemNumber?: number;
      modelAnswer?: string;
    }
  | {
      type: 'ox';
      id: string | number;
      problem: string;
      correctAnswer: 'O' | 'X';
      problemNumber?: number;
      explanation?: string;
    }
  | {
      type: 'memorized';
      id: string | number;
      question: string;
      answer: string;
      cardNumber?: number;
    };

type RouteParams = { 
  title?: string;
  problems?: ProblemData[]; // 백엔드에서 받은 문제 데이터
};

export default function ProblemResultScreen({ route }: { route: { params?: RouteParams } }) {
    const navigation = useNavigation<any>();
    const title = route?.params?.title ?? '문제 생성하기';
    const [problems, setProblems] = useState<ProblemData[]>(route?.params?.problems ?? []);

    // 백엔드에서 받은 문제 데이터가 있으면 사용, 없으면 더미 데이터 사용
    useEffect(() => {
        if (route?.params?.problems) {
            setProblems(route.params.problems);
        }
    }, [route?.params?.problems]);

    // title에 따라 그라데이션 색상 반환 함수
    const getGradientColors = (title: string): string[] => {
        if (title.includes('암기노트') || title.includes('암기 노트')) {
            return ['#F43F5E', '#EC4899', '#F472B6']; // rose-500 → pink-500 → pink-400
        } else if (title.includes('주관식')) {
            return ['#3B82F6', '#6366F1', '#A855F7']; // blue-500 → indigo-500 → purple-500
        } else if (title.includes('OX')) {
            return ['#10B981', '#14B8A6', '#06B6D4']; // emerald-500 → teal-500 → cyan-500
        } else {
            // 객관식 문제 (기본값)
            return ['#6366f1', '#a855f7', '#ec4899']; // indigo-500 → purple-500 → pink-500
        }
    };

    const gradientColors = getGradientColors(title);

    // 문제 유형에 따른 전체 화면 배경색 반환 함수
    const getBackgroundColors = (title: string): string[] => {
        if (title.includes('암기 노트')) {
            return ['#F8FAFC', '#FCE7F3', '#FBCFE8']; // slate-50 → pink-100 → pink-200
        } else if (title.includes('주관식')) {
            return ['#F8FAFC', '#E0E7FF', '#DBEAFE']; // slate-50 → indigo-100 → blue-100
        } else if (title.includes('OX')) {
            return ['#F8FAFC', '#D1FAE5', '#CCFBF1']; // slate-50 → emerald-100 → teal-100
        }
        return ['#eef2ff', '#faf5ff', '#fdf2f8']; // 기본값
    };

    const backgroundColors = getBackgroundColors(title);

    /**
     * 문제 유형에 따라 적절한 컴포넌트를 렌더링하는 함수
     */
    const renderProblem = (problemData: ProblemData, index: number) => {
        switch (problemData.type) {
            case 'multiple_choice':
                return (
                    <MultipleChoiceProblemCard
                        key={problemData.id || index}
                        problem={problemData.problem}
                        choices={problemData.choices}
                        correctAnswer={problemData.correctAnswer}
                        problemNumber={problemData.problemNumber ?? index + 1}
                        explanation={problemData.explanation}
                    />
                );
            
            case 'subjective':
                return (
                    <SubjectiveProblemCard
                        key={problemData.id || index}
                        problem={problemData.problem}
                        problemNumber={problemData.problemNumber ?? index + 1}
                        modelAnswer={problemData.modelAnswer}
                    />
                );
            
            case 'ox':
                return (
                    <OXProblemCard
                        key={problemData.id || index}
                        problem={problemData.problem}
                        correctAnswer={problemData.correctAnswer}
                        problemNumber={problemData.problemNumber ?? index + 1}
                        explanation={problemData.explanation}
                    />
                );
            
            case 'memorized':
                return (
                    <MemorizedNotes
                        key={problemData.id || index}
                        question={problemData.question}
                        answer={problemData.answer}
                        cardNumber={problemData.cardNumber ?? index + 1}
                    />
                );
            
            default:
                return null;
        }
    };


    return (
        //전체 화면에 그라데이션 효과 추가
        <SafeAreaView style={styles.safe}>
            <LinearGradient
                colors={backgroundColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject as any}
            />
            {/* 상단바: 뒤로가기 + DDING 로고 (flex) */}
            <View style={styles.header}>
                <Pressable onPress={() => navigation.navigate('ProblemMake')} style={styles.backHit}>
                    <ChevronLeftIcon size={24} color="#111827" />
                </Pressable>
                <View style={{ marginTop: 6 }}>
                    <DDingLogo />
                </View>
            </View>
            {/* 스크롤 가능한 콘텐츠 영역 */}
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
            >
                {/* 타이틀 영역 */}
                <View style={styles.container}>
                    <LinearGradient
                        colors={gradientColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.banner}
                    >
                        <View style={styles.row}>
                            <View style={styles.iconBadge}>
                                <SparklesIcon size={22} color="#FFFFFF" />
                            </View>
                            <View style={styles.textBox}>
                                <Text style={styles.titleText}>문제 생성 완료!</Text>
                                <Text style={styles.subText}>총 {problems.length}개의 문제가 생성되었습니다.</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
                <View style={styles.problemList}>
                    {problems.length > 0 ? (
                        problems.map((problem, index) => renderProblem(problem, index))
                    ) : (
                        // 더미 데이터 (개발/테스트용)
                        <>
                            <MultipleChoiceProblemCard
                                problem="기원전 483년 아테네 Laureion에서 대규모 은광이 발견된 후, 이 은광 수익의 사용처를 두고 논쟁이 발생했습니다. 당시 테미스토클레스가 제안한 은광 수익 사용 방안은 무엇이었습니까?"
                                choices={["시민들에게 골고루 분배", "대규모 신전 건설", "함선 건조 (2백 여척)", "페르시아에 조공으로 바침"]}
                                correctAnswer="A"
                                problemNumber={1}
                                explanation="문제 설명"
                            />
                            <MultipleChoiceProblemCard
                                problem="살라미스 해전에서 아테네가 페르시아를 격파하는 데 결정적인 역할을 한 아테네의 군사력은 무엇이었습니까?"
                                choices={["막강한 기병대", "견고한 육상 방어선", "대규모 해군 함선", "뛰어난 무장보병"]}
                                correctAnswer="A"
                                problemNumber={2}
                                explanation="문제 설명"
                            />
                            <MemorizedNotes
                                question="광합성이란 무엇인가요?"
                                answer="식물이 빛 에너지를 이용하여 이산화탄소와 물로부터 포도당을 합성하고 산소를 방출하는 과정입니다."
                                cardNumber={3}
                            />
                            <OXProblemCard
                                problem="광합성은 식물이 빛 에너지를 이용하여 포도당을 합성하는 과정이다."
                                correctAnswer="O"
                                problemNumber={4}
                                explanation="광합성은 식물이 엽록체에서 빛 에너지를 이용하여 이산화탄소와 물로부터 포도당을 합성하고 산소를 방출하는 과정입니다."
                            />
                            <SubjectiveProblemCard
                                problem="광합성은 식물이 빛 에너지를 이용하여 포도당을 합성하는 과정이다."
                                modelAnswer="광합성은 식물이 엽록체에서 빛 에너지를 이용하여 이산화탄소와 물로부터 포도당을 합성하고 산소를 방출하는 과정입니다."
                                problemNumber={5}
                            />
                        </>
                    )}
                </View>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#FCFCFF',
    },
    header: {
        paddingTop: 24,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    banner: {
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.25)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBox: {
        marginLeft: 12,
        flexShrink: 1,
    },

    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    subText: {
        marginTop: 4,
        fontSize: 13,
        color: 'rgba(255,255,255,0.9)',
    },
    backHit: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    problemList: {
        paddingHorizontal: 20,
        paddingTop: 24,
        gap: 16,
    },
});

