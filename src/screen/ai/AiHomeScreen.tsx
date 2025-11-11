import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import BottomTabBar, { TabKey } from '../../components/global/BottomTabBar';
import DDingLogo from '../../components/global/DDingLogo';
import CategoryCard from '../../components/ai/CategoryCard';
import FileQuestionIcon from '../../assets/svgs/FileQuestionIcon';
import BookOpenIcon from '../../assets/svgs/BookOpenIcon';
import MessageSquareIcon from '../../assets/svgs/MessageSquareIcon';
import CheckCircle2Icon from '../../assets/svgs/CheckCircle2Icon';
import { useNavigation } from '@react-navigation/native';

export default function AiHomeScreen() {
  const [tab, setTab] = useState<TabKey>('ai');
  const navigation = useNavigation<any>();

  return (
    //전체 화면에 그라데이션 효과 추가
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={["#eef2ff", "#faf5ff", "#fdf2f8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject as any}
      />
      {/* 헤더 영역에 DDING 그라데이션 추가*/}
      <View style={styles.header}>
        <DDingLogo />
        <Text style={styles.section}>Categories</Text>
      </View>
      {/* 카테고리 카드 영역, title, colors, Icon 추가 */}
      <View style={styles.grid}>
        <CategoryCard
          title="객관식 문제"
          colors={["#fbbf24", "#fb923c"]}
          Icon={FileQuestionIcon}
          onPress={() => navigation.navigate('ProblemMake', { title: '객관식 문제', type: 'objective' })}
        />
        <CategoryCard
          title="암기 노트"
          colors={["#fb7185", "#f472b6"]}
          Icon={BookOpenIcon}
          onPress={() => navigation.navigate('ProblemMake', { title: '암기 노트', type: 'memo' })}
        />
        <CategoryCard
          title="주관식 문제"
          colors={["#a78bfa", "#818cf8"]}
          Icon={MessageSquareIcon}
          onPress={() => navigation.navigate('ProblemMake', { title: '주관식 문제', type: 'short' })}
        />
        <CategoryCard
          title="OX 문제"
          colors={["#34d399", "#2dd4bf"]}
          Icon={CheckCircle2Icon}
          onPress={() => navigation.navigate('ProblemMake', { title: 'OX 문제', type: 'ox' })}
        />
      </View>
      <BottomTabBar selectedKey={tab} onChange={setTab} />
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
  },
  section: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    color: '#1e2939',
  },
  grid: {
    paddingHorizontal: 20,
    paddingTop: 16,
    flexWrap: 'wrap' as const,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

