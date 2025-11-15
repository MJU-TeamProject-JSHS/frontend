import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import DDingLogo from '../../components/global/DDingLogo';
import SparklesIcon from '../../assets/svgs/SparklesIcon';
import ChevronLeftIcon from '../../assets/svgs/ChevronLeftIcon';
import UploadIcon from '../../assets/svgs/UploadIcon';
import InfoIcon from '../../assets/svgs/InfoIcon';
import { useNavigation } from '@react-navigation/native';
import UploadedFileItem from '../../components/ai/UploadedFileItem';
import * as DocumentPicker from 'expo-document-picker';

type RouteParams = { title?: string };

export default function ProblemMakeScreen({ route }: { route: { params?: RouteParams } }) {
  const title = route?.params?.title ?? '문제 생성하기';
  
  const navigation = useNavigation<any>();
  const [files, setFiles] = useState<Array<{ name: string; uri: string }>>([]);
  const [isUploading, setIsUploading] = useState(false);

  const DUMMY_UPLOAD_URL = 'https://httpbin.org/post';

  // title에 따라 그라데이션 색상 반환 함수
  const getGradientColors = (title: string): string[] => {
    if (title.includes('암기 노트')) {
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

  //파일 형식 추출 함수
  const getMimeTypeFromName = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
      return 'application/pdf';
      case 'txt':
        return 'text/plain';
      default:
        return 'application/octet-stream';
    }
  };

  
  //파일 선택 함수
  const handlePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
        multiple: true,
        copyToCacheDirectory: true,
      });
      const picked = (result as any).assets
        ? (result as any).assets.map((a: any) => ({ name: a.name, uri: a.uri }))
        : (result as any).type !== 'cancel'
          ? [{ name: (result as any).name, uri: (result as any).uri }]
          : [];
      if (picked.length > 0) {
        setFiles(prev => [...prev, ...picked]);
      }
    } catch (e) {
      // ignore
    }
  };

  const handleRemove = (name: string) => {
    setFiles(prev => prev.filter(f => f.name !== name));
  };

  //백엔드에 파일 넘기는 함수
  const handleSubmit = async () => {
    if (files.length === 0 || isUploading) return;
    try {
      setIsUploading(true);
      // 업로드 진행 화면으로 이동
      navigation.navigate('ProblemLoading', { title });
      const formData = new FormData();
      files.forEach((f) => {
        const type = getMimeTypeFromName(f.name);
        formData.append('files', { uri: f.uri, name: f.name, type } as any);
      });
      formData.append('title', title);

      const res = await fetch(DUMMY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }
      console.log('업로드 완료', '파일이 더미 서버로 전송되었습니다.');
      setFiles([]);
    } catch (e) {
      console.log('업로드 실패', '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
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
        <Pressable onPress={() => navigation.navigate('AiHome')} style={styles.backHit}>
          <ChevronLeftIcon size={24} color="#111827" />
        </Pressable>
        <View style={{ marginTop: 6 }}>
          <DDingLogo />
        </View>
      </View>
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
            <Text style={styles.titleText}>{title} 생성</Text>
            <Text style={styles.subText}>파일을 업로드하면 AI가 문제를 만들어드립니다</Text>
          </View>
        </View>
      </LinearGradient>
    </View>

      {/* 업로드 카드 */}
      <View style={styles.uploadCard}>
        <Pressable onPress={handlePick}>
        <LinearGradient colors={['#eef2ff', '#ffffff']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.uploadInner}>
          <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.uploadBadge}>
            <UploadIcon size={28} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.uploadTitle}>파일 업로드하기</Text>
          <Text style={styles.uploadSub}>PDF, DOC, TXT 파일을 선택해주세요</Text>
        </LinearGradient>
        </Pressable>
      </View>

      {/* 업로드된 파일 섹션 */}
      <Text style={styles.sectionTitle}>업로드된 파일 ({files.length})</Text>
      {files.map(f => (
        <UploadedFileItem 
          key={f.uri} 
          name={f.name} 
          status="준비완료" 
          onRemove={() => handleRemove(f.name)}
          gradientColors={gradientColors}
        />
      ))}

      {/* 안내 카드 */}
      <View style={styles.infoCard}>
        <View style={styles.infoBadge}>
          <InfoIcon size={20} color="#3B82F6" />
        </View>
        <View style={styles.infoTexts}>
          <Text style={styles.infoTitle}>AI가 자동으로 문제를 생성합니다.</Text>
          <Text style={styles.infoBody}>업로드한 파일의 내용을 분석하여 객관식 문제와 해설을 만들어드립니다.</Text>
        </View>
      </View>

      {/* 하단 CTA */}
      <View style={styles.ctaWrap}>
        <Pressable onPress={handleSubmit} disabled={isUploading || files.length === 0}>
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.ctaBtn, (isUploading || files.length === 0) ? { opacity: 0.6 } : undefined]}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <SparklesIcon size={24} color="#FFFFFF" />
              <Text style={[styles.ctaText, { marginLeft: 8 }]}>{isUploading ? '업로드 중...' : '문제 생성하기'}</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
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
    // soft shadow similar to screenshot
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
  uploadCard: {
    marginTop: 12,
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#FFFFFF',
  },
  uploadInner: {
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  uploadSub: {
    marginTop: 6,
    color: '#6b7280',
    fontSize: 12,
  },
  sectionTitle: {
    marginTop: 16,
    marginHorizontal: 20,
    color: '#111827',
    fontWeight: '700',
    fontSize: 12,
  },
  fileItem: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  fileIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    color: '#111827',
    fontWeight: '700',
  },
  fileSub: {
    marginTop: 2,
    color: '#9CA3AF',
    fontSize: 12,
  },
  fileRemove: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCard: {
    marginTop: 16,
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  infoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F2FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTexts: {
    flexShrink: 1,
  },
  infoTitle: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 12,
  },
  infoBody: {
    marginTop: 4,
    color: '#4b5563',
    fontSize: 12,
    lineHeight: 18,
  },
  ctaWrap: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
  },
  ctaBtn: {
    height: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: '#FFFFFF',
    fontWeight: '800',
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

