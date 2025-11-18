import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import DDingLogo from '../../components/global/DDingLogo';
import BottomTabBar from '../../components/global/BottomTabBar';
import PostCard, { PostData } from '../../components/board/PostCard';
import SearchIcon from '../../assets/svgs/SearchIcon';
import EditIcon from '../../assets/svgs/EditIcon';

// 더미 데이터
const MOCK_POSTS: PostData[] = [
  {
    id: 1,
    title: '선형대수학3강 워크시트',
    author: '홍길동',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2일 전
    likeCount: 122,
  },
  {
    id: 2,
    title: '선형대수학3강 워크시트',
    author: '홍길동',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3일 전
    likeCount: 122,
  },
  {
    id: 3,
    title: '선형대수학3강 워크시트',
    author: '홍길동',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5일 전
    likeCount: 122,
  },
  {
    id: 4,
    title: '선형대수학3강 워크시트',
    author: '홍길동',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1주 전
    likeCount: 122,
  },
  {
    id: 5,
    title: '선형대수학3강 워크시트',
    author: '홍길동',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1주 전
    likeCount: 122,
  },
  {
    id: 6,
    title: '선형대수학3강 워크시트',
    author: '홍길동',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2주 전
    likeCount: 122,
  },
];

export default function BoardListScreen() {
  const navigation = useNavigation<any>();

  const handlePostPress = (postId: number) => {
    navigation.navigate('BoardDetail', { postId });
  };

  const handleSearchPress = () => {
    // 검색 기능 구현 예정
    console.log('검색 버튼 클릭');
  };

  const handleWritePress = () => {
    // 게시글 작성 화면으로 이동 예정
    navigation.navigate('BoardWrite');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={["#eef2ff", "#faf5ff", "#fdf2f8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject as any}
      />
      <View style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <DDingLogo />
          <View style={styles.headerActions}>
            <Pressable onPress={handleSearchPress} style={styles.iconButton}>
              <SearchIcon size={20} color="#1e2939" />
            </Pressable>
            <Pressable onPress={handleWritePress} style={styles.iconButton}>
              <EditIcon size={20} color="#1e2939" />
            </Pressable>
          </View>
        </View>

        {/* 제목 섹션 */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>게시판</Text>
          <Text style={styles.subtitle}>총 {MOCK_POSTS.length}개의 게시글</Text>
        </View>

        {/* 게시글 목록 */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {MOCK_POSTS.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onPress={() => handlePostPress(post.id)}
            />
          ))}
        </ScrollView>
      </View>
      <BottomTabBar selectedKey="board" />
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
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
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
});

