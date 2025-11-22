import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import BottomTabBar, { TabKey } from '../../components/global/BottomTabBar';
import { LinearGradient } from 'expo-linear-gradient';

type PostItem = {
  id: number;
  title: string;
  timeAgo: string;
};

type MenuItem = {
  key: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
  colors: [string, string];
  onPress?: () => void;
};

const FIXED_PROFILE = {
  nickname: '임서빈',
};

const POSTS: PostItem[] = [
  { id: 1, title: '게시물 1', timeAgo: '2일 전' },
  { id: 2, title: '게시물 2', timeAgo: '5일 전' },
  { id: 3, title: '게시물 3', timeAgo: '1주 전' },
  { id: 4, title: '게시물 4', timeAgo: '2주 전' },
  { id: 5, title: '게시물 5', timeAgo: '3주 전' },
];

const GUIDE_CARDS = [
  {
    key: 'howto',
    title: '서비스 이용 방법',
    body:
      '회원가입 후 프로필을 설정하고, 다양한 기능을 자유롭게 이용하실 수 있습니다. 게시글 작성 및 AI 기능을 활용해 학습 효율을 높여보세요.',
    colors: ['#51A2FF', '#00D3F2'] as [string, string],
    icon: 'info' as const,
  },
  {
    key: 'privacy',
    title: '개인정보 보호',
    body:
      '회원님의 개인정보는 안전하게 암호화되어 보관됩니다. 개인정보처리방침에 따라 철저히 관리되며 외부에 공개되지 않습니다.',
    colors: ['#00D492', '#00D5BE'] as [string, string],
    icon: 'lock' as const,
  },
  {
    key: 'support',
    title: '고객 지원',
    body:
      '서비스 이용 중 문의사항이 있으시면 언제든지 고객센터로 연락주세요. 평일 09:00-18:00 운영합니다.',
    colors: ['#C27AFF', '#7C86FF'] as [string, string],
    icon: 'headphones' as const,
  },
  {
    key: 'warning',
    title: '주의 사항',
    body:
      '부적절한 콘텐츠 게시 시 경고 없이 삭제될 수 있으며, 반복될 경우 계정이 정지될 수 있습니다.',
    colors: ['#FF637E', '#FB64B6'] as [string, string],
    icon: 'alert-triangle' as const,
  },
];

type NoticeType = 'notice' | 'event';

type NoticeItem = {
  id: number;
  type: NoticeType;
  date: string;
  title: string;
};

const NOTICE_ITEMS: NoticeItem[] = [
  { id: 1, type: 'notice', date: '2025.01.15', title: '2.1.0 버전 업데이트 안내' },
  { id: 2, type: 'notice', date: '2025.01.10', title: '서비스 이용 약관 변경 안내' },
  { id: 3, type: 'event', date: '2025.01.08', title: '신규 가입 이벤트 (1월)' },
  { id: 4, type: 'event', date: '2025.01.05', title: '추천인 이벤트 진행 중!' },
  { id: 5, type: 'notice', date: '2024.12.28', title: '개인정보처리방침 업데이트' },
  { id: 6, type: 'event', date: '2024.12.25', title: '연말 감사 이벤트' },
  { id: 7, type: 'notice', date: '2024.12.18', title: '서버 점검 안내 (12/20)' },
];

type VersionItem = {
  id: number;
  version: string;
  date: string;
  isLatest?: boolean;
  pillColors: [string, string];
  changes: string[];
};

const VERSION_ITEMS: VersionItem[] = [
  {
    id: 1,
    version: 'v 2.1.0',
    date: '출시일: 2025. 01. 15',
    isLatest: true,
    pillColors: ['#C27AFF', '#7C86FF'],
    changes: [
      '새로운 파스텔톤 UI 디자인 적용',
      '프로필 사진 변경 기능 개선',
      '게시글 삭제 시 흐림 효과 추가',
      '전반적인 성능 최적화',
    ],
  },
  {
    id: 2,
    version: 'v 2.0.5',
    date: '출시일: 2024. 12. 20',
    pillColors: ['#51A2FF', '#00D3F2'],
    changes: [
      '닉네임 변경 화면 UI 개선',
      '마이페이지 카드 디자인 업데이트',
      '버그 수정 및 안정성 향상',
    ],
  },
  {
    id: 3,
    version: 'v 2.0.4',
    date: '출시일: 2024. 12. 05',
    pillColors: ['#00D492', '#00D5BE'],
    changes: [
      '공지사항/이벤트 페이지 추가',
      '이용안내 페이지 개선',
      '다크모드 지원 준비',
    ],
  },
];

function GuideModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const topInset = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackdrop}>
        <Pressable style={styles.backdropPress} onPress={onClose} />
        <View style={[styles.modalSheet, { paddingTop: topInset }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.modalHeaderBtn}>
              <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>이용안내</Text>
            <View style={{ width: 40 }} />
          </View>

          <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
            {GUIDE_CARDS.map((c) => (
              <View key={c.key} style={styles.guideCard}>
                <View style={styles.guideRow}>
                  <LinearGradient
                    colors={c.colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.guideIconBadge}
                  >
                    <Feather name={c.icon} size={22} color="#fff" />
                  </LinearGradient>
                  <View style={styles.guideTextArea}>
                    <Text style={styles.guideTitle}>{c.title}</Text>
                    <Text style={styles.guideBody}>{c.body}</Text>
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.contactCard}>
              <Text style={styles.contactTitle}>문의하기</Text>
              <View style={styles.contactList}>
                <View style={styles.contactRow}>
                  <View style={styles.contactDot} />
                  <Text style={styles.contactText}>이메일: support@dding.com</Text>
                </View>
                <View style={styles.contactRow}>
                  <View style={styles.contactDot} />
                  <Text style={styles.contactText}>고객센터: 1588-0000</Text>
                </View>
                <View style={styles.contactRow}>
                  <View style={styles.contactDot} />
                  <Text style={styles.contactText}>운영시간: 평일 09:00 - 18:00</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function NoticeModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const topInset = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackdrop}>
        <Pressable style={styles.backdropPress} onPress={onClose} />
        <View style={[styles.modalSheet, { paddingTop: topInset }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.modalHeaderBtn}>
              <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>공지사항 / 이벤트</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.noticeCategoryBar}>
            <View style={[styles.noticeChip, styles.noticeChipActive]}>
              <LinearGradient
                colors={['#615FFF', '#AD46FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFillObject}
              />
              <Text style={[styles.noticeChipText, styles.noticeChipTextActive]}>전체</Text>
            </View>
            <View style={styles.noticeChip}>
              <Text style={styles.noticeChipText}>공지사항</Text>
            </View>
            <View style={styles.noticeChip}>
              <Text style={styles.noticeChipText}>이벤트</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.noticeList} showsVerticalScrollIndicator={false}>
            {NOTICE_ITEMS.map((n) => {
              const isNotice = n.type === 'notice';
              return (
                <TouchableOpacity key={n.id} activeOpacity={0.8} style={styles.noticeItem}>
                  <LinearGradient
                    colors={
                      isNotice
                        ? (['#00D492', '#00D5BE'] as [string, string])
                        : (['#FF637E', '#FB64B6'] as [string, string])
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.noticeIconBadge}
                  >
                    <Feather name={isNotice ? 'bell' : 'gift'} size={16} color="#fff" />
                  </LinearGradient>

                  <View style={{ flex: 1, gap: 6 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <View
                        style={[
                          styles.noticeTag,
                          isNotice ? styles.noticeTagBlue : styles.noticeTagOrange,
                        ]}
                      >
                        <Text
                          style={[
                            styles.noticeTagText,
                            isNotice ? styles.noticeTagTextBlue : styles.noticeTagTextOrange,
                          ]}
                        >
                          {isNotice ? '공지사항' : '이벤트'}
                        </Text>
                      </View>
                      <Text style={styles.noticeDate}>{n.date}</Text>
                    </View>

                    <Text style={styles.noticeTitle}>{n.title}</Text>
                  </View>

                  <Feather name="chevron-right" size={20} color="#99A1AF" />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function VersionModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const topInset = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;
  const latest = VERSION_ITEMS.find(v => v.isLatest);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackdrop}>
        <Pressable style={styles.backdropPress} onPress={onClose} />
        <View style={[styles.modalSheet, { paddingTop: topInset }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.modalHeaderBtn}>
              <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>버전안내</Text>
            <Text style={styles.versionHeaderLogo}>DDiNG</Text>
          </View>

          <ScrollView contentContainerStyle={styles.versionContent} showsVerticalScrollIndicator={false}>
            {latest && (
              <View style={styles.versionTopCard}>
                <LinearGradient
                  colors={['#C27AFF', '#7C86FF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.versionTopIconBox}
                >
                  <Feather name="smartphone" size={40} color="#fff" />
                </LinearGradient>

                <Text style={styles.versionTopTitle}>
                  앱버전 {latest.version.replace('v ', '')}
                </Text>
                <Text style={styles.versionTopSub}>최신 버전을 사용 중입니다</Text>
              </View>
            )}

            {VERSION_ITEMS.map((v) => (
              <View key={v.id} style={styles.versionCard}>
                <View style={styles.versionCardHeader}>
                  <View style={styles.versionHeaderLeft}>
                    <LinearGradient
                      colors={v.pillColors}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.versionPill}
                    >
                      <Text style={styles.versionPillText}>{v.version}</Text>
                    </LinearGradient>

                    {v.isLatest && (
                      <LinearGradient
                        colors={['#FF637E', '#FB64B6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.versionLatestPill}
                      >
                        <Text style={styles.versionLatestText}>최신</Text>
                      </LinearGradient>
                    )}
                  </View>

                  <Text style={styles.versionDate}>{v.date}</Text>
                </View>

                <View style={styles.versionCardBody}>
                  <Text style={styles.versionChangesTitle}>버전 변경사항</Text>

                  <View style={styles.versionChangesList}>
                    {v.changes.map((c, idx) => (
                      <View key={idx} style={styles.versionChangeRow}>
                        <View style={styles.versionDot} />
                        <Text style={styles.versionChangeText}>{c}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function LogoutModal({
  visible,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.logoutBackdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onCancel} />

        <View style={styles.logoutCard}>
          <LinearGradient
            colors={['#FF637E', '#FB64B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoutIconBadge}
          >
            <Feather name="log-out" size={32} color="#fff" />
          </LinearGradient>

          <Text style={styles.logoutTitle}>로그아웃</Text>
          <Text style={styles.logoutDesc}>정말 로그아웃 하시겠습니까?</Text>

          <View style={styles.logoutBtnRow}>
            <Pressable style={styles.logoutBtnWrap} onPress={onCancel}>
              <View style={styles.logoutCancelBtn}>
                <Text style={styles.logoutCancelText}>취소</Text>
              </View>
            </Pressable>

            <Pressable style={styles.logoutBtnWrap} onPress={onConfirm}>
              <LinearGradient
                colors={['#FF637E', '#FB64B6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={styles.logoutConfirmBtnContent}>
                <Text style={styles.logoutConfirmText}>로그아웃</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function MyPageMainScreen() {
  const [tab, setTab] = useState<TabKey>('my');
  const [guideOpen, setGuideOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [versionOpen, setVersionOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const menuItems = useMemo<MenuItem[]>(
    () => [
      {
        key: 'guide',
        label: '이용안내',
        icon: 'info',
        colors: ['#51A2FF', '#00D3F2'],
        onPress: () => setGuideOpen(true),
      },
      {
        key: 'notice',
        label: '공지사항 / 이벤트',
        icon: 'bell',
        colors: ['#00D492', '#00D5BE'],
        onPress: () => setNoticeOpen(true),
      },
      {
        key: 'version',
        label: '버전안내',
        icon: 'smartphone',
        colors: ['#C27AFF', '#7C86FF'],
        onPress: () => setVersionOpen(true),
      },
      {
        key: 'logout',
        label: '로그아웃',
        icon: 'log-out',
        colors: ['#FF637E', '#FB64B6'],
        onPress: () => setLogoutOpen(true),
      },
    ],
    []
  );

  const topInset = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#EEF2FF', '#FAF5FF', '#FDF2F8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bg}
      />

      <GuideModal visible={guideOpen} onClose={() => setGuideOpen(false)} />
      <NoticeModal visible={noticeOpen} onClose={() => setNoticeOpen(false)} />
      <VersionModal visible={versionOpen} onClose={() => setVersionOpen(false)} />

      <LogoutModal
        visible={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={() => setLogoutOpen(false)}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, { paddingTop: topInset + 24 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCardWrap}>
          <LinearGradient
            colors={['#615FFF', '#AD46FF', '#F6339A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileCard}
          >
            <View style={styles.profileGlowRight} />
            <View style={styles.profileGlowLeft} />

            <TouchableOpacity activeOpacity={0.8} style={styles.avatarWrap}>
              <LinearGradient
                colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatar}
              >
                <Feather name="user" size={40} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.profileTextArea}>
              <Text style={styles.nickname}>{FIXED_PROFILE.nickname}</Text>
              <TouchableOpacity activeOpacity={0.7} style={styles.profileSettingRow}>
                <Text style={styles.profileSettingText}>프로필 설정</Text>
                <Feather name="chevron-right" size={16} color="rgba(255,255,255,0.9)" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>내가 쓴 글</Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.sectionMore}>
              <Text style={styles.sectionMoreText}>전체보기</Text>
              <Feather name="chevron-right" size={14} color="#615FFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.postList}>
            {POSTS.map((p) => (
              <TouchableOpacity key={p.id} activeOpacity={0.8} style={styles.postItem}>
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
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>설정</Text>

          <View style={styles.menuList}>
            {menuItems.map((m) => (
              <TouchableOpacity
                key={m.key}
                activeOpacity={0.8}
                style={styles.menuItem}
                onPress={m.onPress}
              >
                <LinearGradient
                  colors={m.colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.menuIconBadge}
                >
                  <Feather name={m.icon} size={20} color="#fff" />
                </LinearGradient>

                <Text style={styles.menuLabel}>{m.label}</Text>
                <Feather name="chevron-right" size={20} color="#99A1AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <BottomTabBar selectedKey={tab} onChange={(k) => setTab(k)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  bg: { ...StyleSheet.absoluteFillObject },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 140,
    gap: 24,
  },

  profileCardWrap: { width: '100%' },
  profileCard: {
    height: 127.99,
    borderRadius: 28,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  profileGlowRight: {
    position: 'absolute',
    width: 159.99,
    height: 159.99,
    right: -39.99,
    top: -39.99,
    borderRadius: 9999,
    backgroundColor: 'rgba(255,255,255,0.2)',
    opacity: 1,
  },
  profileGlowLeft: {
    position: 'absolute',
    width: 159.99,
    height: 159.99,
    left: -39.99,
    top: 7.99,
    borderRadius: 9999,
    backgroundColor: 'rgba(253,165,213,0.3)',
    opacity: 0.5,
  },
  avatarWrap: {
    width: 79.99,
    height: 79.99,
    borderRadius: 9999,
    marginRight: 20,
  },
  avatar: {
    width: 79.99,
    height: 79.99,
    borderRadius: 9999,
    borderWidth: 1.74665,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTextArea: { flex: 1, gap: 4 },
  nickname: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.0703125,
    lineHeight: 36,
  },
  profileSettingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  profileSettingText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 21,
  },

  section: { width: '100%', gap: 16 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2939',
  },
  sectionMore: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  sectionMoreText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#615FFF',
  },

  postList: { gap: 16 },
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

  menuList: { gap: 12 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16.6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderWidth: 0.6,
    borderColor: 'rgba(229,231,235,0.5)',
  },
  menuIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: { flex: 1, fontSize: 16, fontWeight: '500', color: '#1E2939' },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
  },
  backdropPress: { flex: 1 },
  modalSheet: {
    height: '92%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    height: 72.56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 0.6,
    borderBottomColor: '#F3F4F6',
  },
  modalHeaderBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  modalContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 16,
  },

  guideCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
  },
  guideRow: { flexDirection: 'row', gap: 16 },
  guideIconBadge: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guideTextArea: { flex: 1, gap: 8 },
  guideTitle: { fontSize: 16, fontWeight: '700', color: '#000' },
  guideBody: {
    fontSize: 13,
    lineHeight: 21,
    color: '#4A5565',
  },

  noticeCategoryBar: {
    height: 61.57,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    borderBottomWidth: 0.6,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  noticeChip: {
    height: 36.99,
    paddingHorizontal: 16,
    borderRadius: 9999,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  noticeChipActive: {
    backgroundColor: 'transparent',
    shadowColor: '#936BE7',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
  },
  noticeChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5565',
  },
  noticeChipTextActive: {
    color: '#fff',
  },

  noticeList: {
    padding: 20,
    paddingBottom: 40,
    gap: 12,
  },
  noticeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
  },
  noticeIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noticeTag: {
    height: 18.98,
    paddingHorizontal: 8,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeTagBlue: { backgroundColor: '#DBEAFE' },
  noticeTagOrange: { backgroundColor: '#FFEDD4' },
  noticeTagText: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.12,
  },
  noticeTagTextBlue: { color: '#155DFC' },
  noticeTagTextOrange: { color: '#F54900' },

  noticeDate: {
    fontSize: 11,
    color: '#6A7282',
  },
  noticeTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },

  contactCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
    gap: 12,
  },
  contactTitle: { fontSize: 14, fontWeight: '700', color: '#000' },
  contactList: { gap: 8 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  contactDot: {
    width: 6,
    height: 6,
    borderRadius: 9999,
    backgroundColor: '#C27AFF',
  },
  contactText: { fontSize: 13, color: '#364153' },

  logoutBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutCard: {
    width: 320,
    borderRadius: 24,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  logoutIconBadge: {
    width: 72,
    height: 72,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FB7185',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  logoutTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  logoutDesc: {
    marginTop: 8,
    fontSize: 14,
    color: '#4A5565',
    textAlign: 'center',
  },
  logoutBtnRow: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  logoutBtnWrap: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  logoutCancelBtn: {
    flex: 1,
    width: '100%',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutCancelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#364153',
  },
  logoutConfirmBtnContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutConfirmText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },

  versionHeaderLogo: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
  versionContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 40,
    gap: 16,
  },
  versionTopCard: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 28,
    borderBottomWidth: 0.6,
    borderBottomColor: '#F3F4F6',
    gap: 10,
  },
  versionTopIconBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#936BE7',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 4, height: 4 },
    elevation: 3,
  },
  versionTopTitle: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  versionTopSub: {
    fontSize: 12,
    color: '#6A7282',
  },
  versionCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 2 },
    elevation: 2,
    overflow: 'hidden',
  },
  versionCardHeader: {
    height: 58.55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 0.6,
    borderBottomColor: '#F3F4F6',
  },
  versionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  versionPill: {
    height: 26,
    paddingHorizontal: 12,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  versionLatestPill: {
    height: 24.5,
    paddingHorizontal: 12,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionLatestText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  versionDate: {
    fontSize: 11,
    color: '#6A7282',
  },
  versionCardBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 18,
    gap: 12,
  },
  versionChangesTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  versionChangesList: {
    gap: 8,
  },
  versionChangeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  versionDot: {
    width: 6,
    height: 6,
    borderRadius: 9999,
    backgroundColor: '#C27AFF',
    marginTop: 7,
  },
  versionChangeText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: '#364153',
  },
});
