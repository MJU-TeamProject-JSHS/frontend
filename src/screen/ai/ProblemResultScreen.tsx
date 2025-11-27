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

// 백엔드 응답 타입 (NOTE, SHORT, OX, MCQ)
type BackendProblemType = 'NOTE' | 'SHORT' | 'OX' | 'MCQ';

// 백엔드 응답 문제 데이터 타입
type BackendProblemData = 
  | {
      type: 'MCQ';
      id?: string | number;
      problem: string;
      choices: [string, string, string, string] | string[];
      correctAnswer: 'A' | 'B' | 'C' | 'D' | string;
      explanation?: string;
    }
  | {
      type: 'SHORT';
      id?: string | number;
      problem: string;
      modelAnswer?: string;
    }
  | {
      type: 'OX';
      id?: string | number;
      problem: string;
      correctAnswer: 'O' | 'X' | string;
      explanation?: string;
    }
  | {
      type: 'NOTE';
      id?: string | number;
      question: string;
      answer: string;
    };

// 내부 문제 유형 타입 정의
type ProblemType = 'multiple_choice' | 'subjective' | 'ox' | 'memorized';

// 내부 문제 데이터 타입 정의
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
  problems?: BackendProblemData[] | ProblemData[]; // 백엔드에서 받은 문제 데이터
  rawResponse?: any; // 원본 응답
  error?: string; // 에러 메시지
};

export default function ProblemResultScreen({ route }: { route: { params?: RouteParams } }) {
    const navigation = useNavigation<any>();
    const title = route?.params?.title ?? '문제 생성하기';
    const [problems, setProblems] = useState<ProblemData[]>([]);
    const [error, setError] = useState<string | undefined>(route?.params?.error);

    /**
     * 백엔드 응답 형식(NOTE, SHORT, OX, MCQ)을 내부 형식으로 변환하는 함수
     */
    const convertBackendToInternal = (backendProblems: any[]): ProblemData[] => {
        console.log('🔄 변환 시작 - 백엔드 문제 개수:', backendProblems.length);
        
        const result: ProblemData[] = [];
        
        backendProblems.forEach((backendProblem: any, index: number) => {
            const baseId = backendProblem.id ?? index;
            const problemNumber = index + 1;

            // type 필드가 없으면 데이터 구조를 보고 타입 추론
            let problemType: string;
            if (backendProblem.type) {
                problemType = typeof backendProblem.type === 'string' 
                    ? backendProblem.type.toUpperCase() 
                    : backendProblem.type;
            } else {
                // type 필드가 없으면 데이터 구조로 추론
                if (backendProblem.question && backendProblem.answer) {
                    // NOTE 타입: question과 answer가 있음
                    problemType = 'NOTE';
                } else if (backendProblem.choices && Array.isArray(backendProblem.choices)) {
                    // choices가 있으면 객관식(MCQ)
                    problemType = 'MCQ';
                } else if (backendProblem.correctAnswer && 
                          (backendProblem.correctAnswer.toUpperCase() === 'O' || 
                           backendProblem.correctAnswer.toUpperCase() === 'X')) {
                    // correctAnswer가 O 또는 X면 OX
                    problemType = 'OX';
                } else {
                    // 그 외는 주관식(SHORT)
                    problemType = 'SHORT';
                }
                
                if (index === 0) {
                    console.log(`📋 문제 ${index + 1} - type 필드 없음, 추론된 타입: ${problemType}`);
                }
            }

            // 첫 번째 문제만 상세 로그
            if (index === 0) {
                console.log(`📋 문제 ${index + 1} 변환 중:`, {
                    원본타입: backendProblem.type || '없음',
                    추론된타입: problemType,
                });
            }

            switch (problemType) {
                case 'MCQ': {
                    // choices가 배열인지 확인하고 4개로 맞춤
                    const choicesArray = Array.isArray(backendProblem.choices) 
                        ? backendProblem.choices 
                        : [];
                    
                    // 4개 미만이면 빈 문자열로 채움
                    while (choicesArray.length < 4) {
                        choicesArray.push('');
                    }
                    
                    // correctAnswer를 'A' | 'B' | 'C' | 'D'로 변환
                    let correctAnswer: 'A' | 'B' | 'C' | 'D' = 'A';
                    if (typeof backendProblem.correctAnswer === 'string') {
                        const upper = backendProblem.correctAnswer.toUpperCase();
                        if (['A', 'B', 'C', 'D'].includes(upper)) {
                            correctAnswer = upper as 'A' | 'B' | 'C' | 'D';
                        }
                    }

                    result.push({
                        type: 'multiple_choice' as const,
                        id: baseId,
                        problem: backendProblem.problem || '',
                        choices: [choicesArray[0], choicesArray[1], choicesArray[2], choicesArray[3]] as [string, string, string, string],
                        correctAnswer,
                        problemNumber,
                        explanation: backendProblem.explanation,
                    });
                    return null as any;
                }
                
                case 'SHORT': {
                    result.push({
                        type: 'subjective' as const,
                        id: baseId,
                        problem: backendProblem.problem || '',
                        problemNumber,
                        modelAnswer: backendProblem.modelAnswer,
                    });
                    return null as any;
                }
                
                case 'OX': {
                    // correctAnswer를 'O' | 'X'로 변환
                    let correctAnswer: 'O' | 'X' = 'O';
                    if (typeof backendProblem.correctAnswer === 'string') {
                        const upper = backendProblem.correctAnswer.toUpperCase();
                        if (upper === 'O' || upper === 'X') {
                            correctAnswer = upper as 'O' | 'X';
                        }
                    }
                    
                    result.push({
                        type: 'ox' as const,
                        id: baseId,
                        problem: backendProblem.problem || '',
                        correctAnswer,
                        problemNumber,
                        explanation: backendProblem.explanation,
                    });
                    return null as any;
                }
                
                case 'NOTE': {
                    // NOTE 타입은 cards 배열을 가질 수 있음
                    if (backendProblem.cards && Array.isArray(backendProblem.cards)) {
                        // cards 배열의 각 요소를 개별 카드로 변환
                        backendProblem.cards.forEach((card: any, cardIndex: number) => {
                            result.push({
                                type: 'memorized' as const,
                                id: card.cardNumber || cardIndex + 1,
                                question: card.question || '',
                                answer: card.answer || '',
                                cardNumber: card.cardNumber || cardIndex + 1,
                            });
                        });
                        return null as any; // 이미 result에 추가했으므로 null 반환
                    } else {
                        // 단일 카드인 경우
                        return {
                            type: 'memorized' as const,
                            id: baseId,
                            question: backendProblem.question || '',
                            answer: backendProblem.answer || '',
                            cardNumber: problemNumber,
                        };
                    }
                }
                
                default:
                    // 알 수 없는 타입은 로그를 남기고 null 반환
                    console.warn(`⚠️ 알 수 없는 타입: ${problemType}`, {
                        원본데이터: backendProblem,
                        인덱스: index,
                    });
                    return null as any;
            }
        });
        
        console.log('✅ 변환 완료, 최종 문제 개수:', result.length);
        return result;
    };

    // 백엔드에서 받은 문제 데이터 변환 및 설정
    useEffect(() => {
        console.log('🔍 ProblemResultScreen - route params:', route?.params);
        console.log('🔍 problems:', route?.params?.problems);
        console.log('🔍 rawResponse:', route?.params?.rawResponse);
        console.log('🔍 error:', route?.params?.error);
        
        if (route?.params?.problems) {
            const backendProblems = route.params.problems;
            console.log('📦 받은 problems 타입:', Array.isArray(backendProblems) ? '배열' : typeof backendProblems);
            console.log('📦 받은 problems 길이:', Array.isArray(backendProblems) ? backendProblems.length : '배열 아님');
            
            // 배열이 아니거나 빈 배열인 경우 처리
            if (!Array.isArray(backendProblems) || backendProblems.length === 0) {
                console.warn('⚠️ problems가 배열이 아니거나 비어있습니다.');
                setProblems([]);
                return;
            }
            
            // 첫 번째 문제 샘플 확인
            if (backendProblems.length > 0) {
                console.log('📋 첫 번째 문제 샘플:', JSON.stringify(backendProblems[0], null, 2));
                console.log('📋 첫 번째 문제의 키들:', Object.keys(backendProblems[0]));
            }
            
            // 이미 내부 형식인지 확인 (type이 'multiple_choice' 등인 경우)
            const isInternalFormat = backendProblems.some(
                (p: any) => ['multiple_choice', 'subjective', 'ox', 'memorized'].includes(p.type)
            );
            
            console.log('🔍 내부 형식 여부:', isInternalFormat);
            
            if (isInternalFormat) {
                // 이미 내부 형식이면 그대로 사용
                console.log('✅ 내부 형식으로 사용');
                setProblems(backendProblems as ProblemData[]);
            } else {
                // 백엔드 형식이면 변환
                console.log('🔄 백엔드 형식을 내부 형식으로 변환 중...');
                const converted = convertBackendToInternal(backendProblems as BackendProblemData[]);
                console.log('✅ 변환 완료, 변환된 문제 개수:', converted.length);
                if (converted.length === 0 && backendProblems.length > 0) {
                    console.error('❌ 변환 실패 - 모든 문제가 필터링되었습니다.');
                    console.error('❌ 첫 번째 문제 상세:', JSON.stringify(backendProblems[0], null, 2));
                }
                setProblems(converted);
            }
        } else if (route?.params?.rawResponse) {
            // rawResponse에서 문제 데이터 추출 시도
            const rawData = route.params.rawResponse;
            console.log('📦 rawResponse에서 데이터 추출 시도:', rawData);
            
            let extractedProblems: any[] = [];
            if (Array.isArray(rawData)) {
                extractedProblems = rawData;
                console.log('✅ rawResponse가 배열입니다.');
            } else if (rawData.problems && Array.isArray(rawData.problems)) {
                extractedProblems = rawData.problems;
                console.log('✅ rawResponse.problems에서 추출');
            } else if (rawData.questions && Array.isArray(rawData.questions)) {
                extractedProblems = rawData.questions;
                console.log('✅ rawResponse.questions에서 추출');
            } else if (rawData.data && Array.isArray(rawData.data)) {
                extractedProblems = rawData.data;
                console.log('✅ rawResponse.data에서 추출');
            } else {
                console.warn('⚠️ rawResponse에서 문제 데이터를 찾을 수 없습니다.');
            }
            
            console.log('📦 추출된 문제 개수:', extractedProblems.length);
            
            if (extractedProblems.length > 0) {
                if (extractedProblems.length > 0) {
                    console.log('📋 첫 번째 문제 샘플:', JSON.stringify(extractedProblems[0], null, 2));
                }
                
                const isInternalFormat = extractedProblems.some(
                    (p: any) => ['multiple_choice', 'subjective', 'ox', 'memorized'].includes(p.type)
                );
                
                console.log('🔍 내부 형식 여부:', isInternalFormat);
                
                if (isInternalFormat) {
                    setProblems(extractedProblems as ProblemData[]);
                } else {
                    const converted = convertBackendToInternal(extractedProblems as BackendProblemData[]);
                    console.log('✅ 변환 완료, 변환된 문제 개수:', converted.length);
                    setProblems(converted);
                }
            }
        } else {
            console.warn('⚠️ problems와 rawResponse 모두 없습니다.');
        }
        
        if (route?.params?.error) {
            setError(route.params.error);
        }
    }, [route?.params?.problems, route?.params?.rawResponse, route?.params?.error]);

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
                    {error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : problems.length > 0 ? (
                        problems.map((problem, index) => renderProblem(problem, index))
                    ) : (
                        // 더미 데이터는 백엔드 데이터가 없을 때만 표시
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>생성된 문제가 없습니다.</Text>
                            <Text style={styles.emptySubText}>파일을 업로드하여 문제를 생성해주세요.</Text>
                        </View>
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
    errorContainer: {
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#FEE2E2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        fontSize: 14,
        color: '#DC2626',
        textAlign: 'center',
    },
    emptyContainer: {
        padding: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
        textAlign: 'center',
        marginBottom: 8,
    },
    emptySubText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },
});

