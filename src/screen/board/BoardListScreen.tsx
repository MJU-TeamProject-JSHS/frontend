import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import DDingLogo from '../../components/global/DDingLogo';
import BottomTabBar from '../../components/global/BottomTabBar';
import PostCard, { PostData } from '../../components/board/PostCard';
import SearchIcon from '../../assets/svgs/SearchIcon';
import EditIcon from '../../assets/svgs/EditIcon';

const MOCK_POSTS: PostData[] = [
  {
    id: 1,
    title: '공학수학 5,6주차 과제 손풀이',
    author: '운영자',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 122,
  },
  {
    id: 2,
    title: '선형대수학3강 워크시트',
    author: '이상빈',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 52,
  },
  {
    id: 3,
    title: '웹프로그래밍 과제 조건',
    author: '오지훈',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 99,
  },
  {
    id: 4,
    title: '역사와 문명 시험범위',
    author: '임서빈',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 12,
  },
  {
    id: 5,
    title: '선대 5강 워크시트',
    author: '강현준',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 62,
  },
  {
    id: 6,
    title: '세사변 3강 요약정리',
    author: '임서빈',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 44,
  },
];

export default function BoardListScreen() {
  const navigation = useNavigation<any>();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handlePostPress = (postId: number) => {
    navigation.navigate('BoardDetail', { postId });
  };

  const handleSearchPress = () => {
    setSearchOpen(true);
  };

  const handleWritePress = () => {
    navigation.navigate('BoardWrite');
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchText('');
    Keyboard.dismiss();
  };

  const normalizedQuery = searchText.trim().toLowerCase();

  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) return MOCK_POSTS;
    return MOCK_POSTS.filter(p =>
      (p.title ?? '').toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const isSearching = searchOpen && normalizedQuery.length > 0;
  const countForSubtitle = isSearching ? filteredPosts.length : MOCK_POSTS.length;

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
            <Pressable onPress={handleSearchPress} style={styles.iconButton}>
              <SearchIcon size={20} color="#1e2939" />
            </Pressable>
            <Pressable onPress={handleWritePress} style={styles.iconButton}>
              <EditIcon size={20} color="#1e2939" />
            </Pressable>
          </View>
        </View>

        {searchOpen && (
          <View style={styles.searchBar}>
            <View style={styles.searchInputBox}>
              <Pressable onPress={() => Keyboard.dismiss()} hitSlop={6}>
                <SearchIcon size={16} color="#6a7282" />
              </Pressable>
              <TextInput
                style={styles.searchInput}
                placeholder="제목으로 검색"
                placeholderTextColor="#9AA1AF"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus
                returnKeyType="search"
                onSubmitEditing={() => Keyboard.dismiss()}
              />
            </View>

            <Pressable onPress={closeSearch} style={styles.searchCancelBtn}>
              <Text style={styles.searchCancelText}>취소</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.titleSection}>
          <Text style={styles.title}>게시판</Text>
          <Text style={styles.subtitle}>
            총 {countForSubtitle}개의 게시글
          </Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredPosts.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>검색 결과가 없습니다.</Text>
            </View>
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPress={() => handlePostPress(post.id)}
              />
            ))
          )}
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

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  searchInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1e2939',
    paddingVertical: 0,
  },
  searchCancelBtn: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  searchCancelText: {
    fontSize: 15,
    color: '#615FFF',
    fontWeight: '600',
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
    paddingTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9AA1AF',
  },
});
