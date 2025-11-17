import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// 테스트용 더미
type UserProfile = {
  id: string;
  nickname: string;
  avatarUrl: string;
};

type MyPost = {
  id: number;
  title: string;
  createdAt: string;
  likeCount?: number;
  commentCount?: number;
};

const MOCK_PROFILE: UserProfile = {
  id: 'user-1',
  nickname: '남남수수학학원',
  avatarUrl: 'https://i.pravatar.cc/150?img=3',
};

const MOCK_MY_POSTS: MyPost[] = [
  {
    id: 101,
    title: 'React Native로 게시판 앱 만들기',
    createdAt: '2025-11-10T09:30:00Z',
    likeCount: 12,
    commentCount: 3,
  },
  {
    id: 102,
    title: '팀 프로젝트 회의 정리',
    createdAt: '2025-11-12T14:15:00Z',
    likeCount: 5,
    commentCount: 1,
  },
  {
    id: 103,
    title: '보안 과제 정리 메모',
    createdAt: '2025-11-13T21:00:00Z',
    likeCount: 0,
    commentCount: 0,
  },
];

const APP_VERSION = '0.1.0';

//천단위로 콤마
const fmtNumber = (n: number | undefined) =>
  String(n ?? 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

//날짜 포맷 (YYYY.MM.DD)으로 바꾸기
function formatDateShort(iso: string) {
  try {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
  } catch {
    return '';
  }
}

//임시 스타일
const S = {
  page: { flex: 1, backgroundColor: '#f9fafb' as const },
  container: { padding: 16 },

  // 섹션 헤더 (제목 + 전체 보기)
  sectionHeaderRow: {
    marginTop: 24,
    marginBottom: 8,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#374151',
  },
  sectionMoreText: {
    fontSize: 12,
    color: '#2563eb',
  },

  // 프로필 카드
  profileCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 9999,
    backgroundColor: '#e5e7eb',
  },
  profileTextWrap: { marginLeft: 16, flex: 1 },
  nickname: { fontSize: 18, fontWeight: '700' as const },

  // 내 글 목록
  postCard: {
    marginTop: 8,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  postTitle: { fontSize: 15, fontWeight: '600' as const, color: '#111827' },
  postMetaRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginTop: 4,
  },
  postMetaText: { fontSize: 12, color: '#6b7280' },

  // 설정 카테
  settingCard: {
    marginTop: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    overflow: 'hidden' as const,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  settingItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingLabel: { fontSize: 15, color: '#111827' },
  settingSub: { fontSize: 12, color: '#6b7280' },
  settingDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
};

// 일단 알림으로 대체
function handlePressPost(post: MyPost) {
  Alert.alert(
    '게시글 상세',
    `"${post.title}" 상세 페이지로 이동 예정입니다.\n\n나중에 navigation.navigate('BoardDetail', { postId: ${post.id} }) 로 연결합니다.`
  );
}

function handlePressSetting(key: 'guide' | 'notice' | 'version' | 'logout') {
  const msg = {
    guide: '이용안내 화면 이동 예정',
    notice: '공지사항/이벤트 화면 이동 예정',
    version: `현재 앱 버전: v${APP_VERSION}`,
    logout: '로그아웃 기능 연결 예정 (토큰 삭제 등)',
  }[key];

  Alert.alert(msg);
}

// ----- 컴포넌트 -----
export default function MyPageScreen() {
  const profile = MOCK_PROFILE;
  const posts = MOCK_MY_POSTS;

  return (
    <ScrollView style={S.page} contentContainerStyle={S.container}>
      

      {/* 프로필 카드 */}
      <View style={S.profileCard}>
        <Image source={{ uri: profile.avatarUrl }} style={S.avatar} />

        <View style={S.profileTextWrap}>
          <Text style={S.nickname}>{profile.nickname}</Text>
        </View>
      </View>

      {/* 내가 쓴 글 + 전체 보기 */}
      <View style={S.sectionHeaderRow}>
        <Text style={S.sectionTitle}>내가 작성한 글</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              '전체 보기',
              '내가 작성한 모든 글 목록 화면으로 이동 예정입니다.'
            )
          }
        >
          <Text style={S.sectionMoreText}>전체 보기</Text>
        </TouchableOpacity>
      </View>

      {posts.length === 0 ? (
        <Text style={{ fontSize: 13, color: '#9ca3af' }}>
          아직 작성한 게시글이 없습니다.
        </Text>
      ) : (
        posts.map(post => (
          <TouchableOpacity
            key={post.id}
            style={S.postCard}
            activeOpacity={0.7}
            onPress={() => handlePressPost(post)}
          >
            <Text style={S.postTitle} numberOfLines={1}>
              {post.title}
            </Text>
            <View style={S.postMetaRow}>
              {/* ✅ 날짜만 표시 (좋아요 수 제거) */}
              <Text style={S.postMetaText}>
                {formatDateShort(post.createdAt)}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      )}

      {/* 설정 */}
      <Text style={[S.sectionTitle, { marginTop: 24 }]}>설정</Text>

      <View style={S.settingCard}>
        <TouchableOpacity
          style={S.settingItem}
          onPress={() => handlePressSetting('guide')}
        >
          <View>
            <Text style={S.settingLabel}>이용안내</Text>
            <Text style={S.settingSub}>서비스 사용 방법을 안내합니다.</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <View style={S.settingDivider} />

        <TouchableOpacity
          style={S.settingItem}
          onPress={() => handlePressSetting('notice')}
        >
          <View>
            <Text style={S.settingLabel}>공지사항 / 이벤트</Text>
            <Text style={S.settingSub}>중요 공지 및 이벤트 소식</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <View style={S.settingDivider} />

        <TouchableOpacity
          style={S.settingItem}
          onPress={() => handlePressSetting('version')}
        >
          <View>
            <Text style={S.settingLabel}>버전 안내</Text>
            <Text style={S.settingSub}>현재 앱 버전: v{APP_VERSION}</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#9ca3af" />
        </TouchableOpacity>

        <View style={S.settingDivider} />

        <TouchableOpacity
          style={S.settingItem}
          onPress={() => handlePressSetting('logout')}
        >
          <View>
            <Text style={[S.settingLabel, { color: '#b91c1c' }]}>로그아웃</Text>
            <Text style={S.settingSub}>현재 계정에서 로그아웃합니다.</Text>
          </View>
          <Feather name="log-out" size={20} color="#b91c1c" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
