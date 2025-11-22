import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

type PostItem = {
  id: number;
  title: string;
  timeAgo: string;
};

const POSTS: PostItem[] = [
  { id: 1, title: '공학수학 5,6주차 과제 손풀이', timeAgo: '2일 전' },
  { id: 2, title: '4차산업혁명시대의 예술 중간 분할 pdf', timeAgo: '5일 전' },
  { id: 3, title: '이산수학개론 기말고사 범위 변경', timeAgo: '1주 전' },
  { id: 4, title: '세계화와 사회변화 정리노트 ', timeAgo: '2주 전' },
  { id: 5, title: '성서와 인간이해 교재 다운로드 방법', timeAgo: '3주 전' },
];

export default function MyPostsScreen() {
  const navigation = useNavigation<any>();
  const topInset = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  return (
    <SafeAreaView style={styles.root}>
      <LinearGradient
        colors={['#EEF2FF', '#FAF5FF', '#FDF2F8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={[styles.header, { paddingTop: topInset + 12 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내가 쓴 글 전체보기</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.listWrap}
        showsVerticalScrollIndicator={false}
      >
        {POSTS.map((p) => (
          <TouchableOpacity
            key={p.id}
            activeOpacity={0.8}
            style={styles.postItem}
            onPress={() => navigation.navigate('BoardDetail', { postId: p.id })}
          >
            <LinearGradient
              colors={['#7C86FF', '#C27AFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.postIconBadge}
            >
              <Feather name="file-text" size={14} color="#fff" />
            </LinearGradient>

            <View style={styles.postTextArea}>
              <Text style={styles.postTitle}>{p.title}</Text>
              <Text style={styles.postTime}>{p.timeAgo}</Text>
            </View>

            <Feather name="chevron-right" size={20} color="#99A1AF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },

  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  listWrap: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    gap: 16,
  },

  postItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16.6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 0.6,
    borderColor: 'rgba(229,231,235,0.5)',
  },
  postIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  postTextArea: { flex: 1, gap: 4 },
  postTitle: { fontSize: 15, fontWeight: '600', color: '#1E2939' },
  postTime: { fontSize: 12, color: '#6A7282' },
});
