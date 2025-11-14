
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';


// 
export type PostAttachment = {
  url: string;        // 원격 URL
  name: string;       // 파일 이름
  sizeBytes?: number; // 파일 크기 (선택)
};

export type PostDetail = {
  id: number;
  title: string;
  author?: string;
  createdAt?: string;  //시간까지 보여줌
  body: string;
  attachments?: PostAttachment[];
  likeCount?: number;
  scrapCount?: number;
};

// 숫자 포맷 (Intl 안 씀)
const fmtNumber = (n: number) =>
  String(Math.floor(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

//임시 스타일 (피그마로 다시 해야됨)
const S = {
  page: { flex: 1, backgroundColor: '#fff' as const },
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700' as const },
  meta: { marginTop: 6, color: '#6b7280' },
  body: { marginTop: 14, fontSize: 16, lineHeight: 24 },
  sectionTitle: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#374151',
  },
  fileRow: {
    marginTop: 10,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fafafa',
  },
  fileName: { fontSize: 15, fontWeight: '600' as const },
  fileMeta: { marginTop: 4, color: '#6b7280' },
  row: { flexDirection: 'row' as const, alignItems: 'center' as const },
  actions: { flexDirection: 'row' as const, marginTop: 18 },
  btn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  btnLabel: { fontWeight: '700' as const },
  count: { marginLeft: 6, color: '#6b7280' },
};


// 파일 크기 표기 (임시)
function humanSize(bytes?: number) {
  if (!bytes && bytes !== 0) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let v = bytes;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v >= 100 ? 0 : v >= 10 ? 1 : 2)} ${units[i]}`;
}

// 날짜 포맷
function formatDate(iso?: string) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${y}.${m}.${day} ${hh}:${mm}`;
  } catch {
    return '';
  }
}

// 파일 열기 (원격 URL)
async function openFileUrl(url: string) {
  try {
    const ok = await Linking.canOpenURL(url);
    if (!ok) throw new Error('URL을 열 수 없습니다.');
    await Linking.openURL(url);
  } catch (e: any) {
    Alert.alert('파일 열기 실패', e?.message ?? '파일을 열 수 없습니다.');
  }
}

//테스트용 목업
const MOCK: PostDetail = {
  id: 1,
  title: '게시글 제목 예시',
  author: '운영자',
  createdAt: new Date().toISOString(),
  body: `본문 내용 예시입니다.

- 작성자 / 작성일 표시
- 첨부는 전부 파일 (pdf, jpg 모두 가능)
- 파일 탭 시 브라우저/뷰어에서 열기`,
  attachments: [
    {
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      name: '안내문.pdf',
      sizeBytes: 86_016,
    },
    {
      url: 'https://picsum.photos/1200/675', // jpg 예시 (이미지 파일도 "파일"로 취급)
      name: '사진.jpg',
      sizeBytes: 120_000,
    },
  ],
  likeCount: 12,
  scrapCount: 3,
};

//컴포
export default function BoardDetailScreen() {
  const navigation: any = useNavigation();
  const data = MOCK; // 나중에 API/네비 연동 시 교체

  const [liked, setLiked] = useState(false);
  const [scrapped, setScrapped] = useState(false);
  const likeDisplay = (data.likeCount ?? 0) + (liked ? 1 : 0);
  const scrapDisplay = (data.scrapCount ?? 0) + (scrapped ? 1 : 0);

  return (
    <ScrollView style={S.page} contentContainerStyle={S.container}>
      {/* 뒤로가기 아이콘 */}
    <Feather
      name="arrow-left"
      size={26}
      color="#111"
      style={{ marginBottom: 16 }}
    />
    

      {/* 제목 + 작성자/작성일 + 본문 */}
      <Text style={S.title}>{data.title}</Text>
      <Text style={S.meta}>
        {data.author ?? '작성자 미상'}
        {data.createdAt ? ` · ${formatDate(data.createdAt)}` : ''}
      </Text>
      <Text style={S.body}>{data.body}</Text>

      {/* 첨부 파일 */}
      {data.attachments && data.attachments.length > 0 && (
        <>
          <Text style={S.sectionTitle}>첨부 파일</Text>
          {data.attachments.map((f, idx) => (
            <TouchableOpacity
              key={`${f.name}-${idx}`}
              style={S.fileRow}
              activeOpacity={0.7}
              onPress={() => openFileUrl(f.url)}
            >
              <Text style={S.fileName}>{f.name}</Text>
              <View style={S.row}>
                <Text style={S.fileMeta}>
                  {Platform.select({
                    ios: '열기/공유',
                    android: '열기/다운로드',
                    default: '열기',
                  })}
                </Text>
                <Text style={[S.fileMeta, { marginLeft: 8 }]}>
                  {humanSize(f.sizeBytes)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}

      {/* 좋아요랑 스크랩 */}
      <View style={S.actions}>
        <TouchableOpacity
          accessibilityLabel="좋아요"
          style={[
            S.btn,
            { marginRight: 12 },
            liked && { backgroundColor: '#fef3c7', borderColor: '#f59e0b' },
          ]}
          onPress={() => setLiked(v => !v)}
        >
          <Text style={S.btnLabel}>좋아요</Text>
          <Text style={S.count}>{fmtNumber(likeDisplay)}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityLabel="스크랩"
          style={[
            S.btn,
            scrapped && { backgroundColor: '#ede9fe', borderColor: '#7c3aed' },
          ]}
          onPress={() => setScrapped(v => !v)}
        >
          <Text style={S.btnLabel}>스크랩</Text>
          <Text style={S.count}>{fmtNumber(scrapDisplay)}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
