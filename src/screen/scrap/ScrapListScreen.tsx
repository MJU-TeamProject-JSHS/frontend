import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import DDingLogo from '../../components/global/DDingLogo';
import BottomTabBar from '../../components/global/BottomTabBar';
import PostCard, { PostData } from '../../components/board/PostCard';

const SCRAP_POSTS: PostData[] = [
  {
    id: 1,
    title: '공학수학 5,6주차 과제 손풀이',
    author: '운영자',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 122,
  },
  {
    id: 2,
    title: '4차산업혁명시대의 예술 중간 분할 pdf',
    author: '임서빈',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 55,
  },
];

export default function ScrapListScreen() {
  const navigation = useNavigation<any>();

  const handlePostPress = (postId: number) => {
    navigation.navigate('BoardDetail', {
      postId,
      fromScrap: true,
    });
  };

  const handleEditScrapPress = () => {
    console.log('스크랩 편집 클릭');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={['#eef2ff', '#faf5ff', '#fdf2f8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject as any}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <DDingLogo />
          <View style={styles.headerActions}>
            
          </View>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>자료실</Text>
          <Text style={styles.subtitle}>총 {SCRAP_POSTS.length}개의 스크랩</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {SCRAP_POSTS.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>스크랩한 게시글이 없습니다.</Text>
            </View>
          ) : (
            SCRAP_POSTS.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPress={() => handlePostPress(post.id)}
              />
            ))
          )}
        </ScrollView>
      </View>

      <BottomTabBar selectedKey="library" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FCFCFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 0.6,
    borderColor: 'rgba(229,231,235,0.6)',
  },
  editText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e2939',
  },
  titleSection: {
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e2939',
    lineHeight: 33,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6a7282',
    lineHeight: 19.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  emptyBox: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6a7282',
  },
});
