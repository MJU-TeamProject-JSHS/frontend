import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import DDingLogo from '../../components/global/DDingLogo';
import ChevronLeftIcon from '../../assets/svgs/ChevronLeftIcon';
import UploadIcon from '../../assets/svgs/UploadIcon';
import XIcon from '../../assets/svgs/XIcon';
import UploadedFileItem from '../../components/ai/UploadedFileItem';

// TODO: 실제 백엔드 API URL로 변경
const DUMMY_UPLOAD_URL = 'https://httpbin.org/post';

// 인용 가능한 게시글 목록 (실제로는 API에서 가져와야 함)
const QUOTABLE_POSTS = [
  { id: 1, title: '공학수학 5,6주차 과제 손풀이' },
  { id: 2, title: '선형대수학3강 워크시트' },
  { id: 3, title: '웹프로그래밍 과제 조건' },
  { id: 4, title: '역사와 문명 시험범위' },
  { id: 5, title: '선대 5강 워크시트' },
  { id: 6, title: '세사변 3강 요약정리' },
];

type QuotedPost = {
  id: number;
  title: string;
};

export default function BoardWriteScreen() {
  const navigation = useNavigation<any>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<Array<{ name: string; uri: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quotedPost, setQuotedPost] = useState<QuotedPost | null>(null);

  // 파일 형식 추출 함수
  const getMimeTypeFromName = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
        return 'application/pdf';
      case 'doc':
        return 'application/msword';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'txt':
        return 'text/plain';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      default:
        return 'application/octet-stream';
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCompletePress = async () => {
    // 제목과 본문 검증
    if (!title.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      Alert.alert('알림', '본문을 입력해주세요.');
      return;
    }

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // FormData 생성
      const formData = new FormData();
      
      // 제목과 본문 추가
      formData.append('title', title.trim());
      formData.append('content', content.trim());

      // 파일 추가
      files.forEach((file) => {
        const type = getMimeTypeFromName(file.name);
        formData.append('files', {
          uri: file.uri,
          name: file.name,
          type,
        } as any);
      });

      // 백엔드로 전송
      // React Native에서는 FormData 사용 시 Content-Type 헤더를 설정하지 않음
      // fetch가 자동으로 boundary를 설정함
      const response = await fetch(DUMMY_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('게시글 작성에 실패했습니다.');
      }

      const result = await response.json();
      console.log('게시글 작성 성공:', result);

      Alert.alert('성공', '게시글이 작성되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            // 성공 후 목록으로 이동
            navigation.goBack();
          },
        },
      ]);
    } catch (error: any) {
      console.error('게시글 작성 오류:', error);
      Alert.alert('오류', error.message || '게시글 작성 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUploadPress = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
          'image/jpeg',
          'image/png',
          'image/gif',
        ],
        multiple: true,
        copyToCacheDirectory: true,
      });

      const picked = (result as any).assets
        ? (result as any).assets.map((a: any) => ({ name: a.name, uri: a.uri }))
        : (result as any).type !== 'cancel'
          ? [{ name: (result as any).name, uri: (result as any).uri }]
          : [];

      if (picked.length > 0) {
        setFiles((prev) => [...prev, ...picked]);
      }
    } catch (error) {
      console.error('파일 선택 오류:', error);
      Alert.alert('오류', '파일 선택 중 오류가 발생했습니다.');
    }
  };

  const handleRemoveFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const handleQuotePress = () => {
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
  };

  const handleSelectQuote = (post: QuotedPost) => {
    setQuotedPost(post);
    setIsQuoteModalOpen(false);
  };

  const handleRemoveQuote = () => {
    setQuotedPost(null);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient
        colors={["#eef2ff", "#faf5ff", "#fdf2f8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject as any}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.container}>
          {/* 헤더 */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Pressable onPress={handleBackPress} style={styles.backButton}>
                <ChevronLeftIcon size={24} color="#1e2939" />
              </Pressable>
              <DDingLogo />
            </View>
            <Pressable
              onPress={handleCompletePress}
              disabled={isSubmitting}
              style={styles.completeButton}
            >
              <LinearGradient
                colors={["#6366f1", "#a855f7", "#ec4899"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.completeButtonGradient,
                  isSubmitting && { opacity: 0.6 }
                ]}
              >
                <Text style={styles.completeButtonText}>
                  {isSubmitting ? '작성 중...' : '완료'}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* 제목 입력 필드 */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.titleInput}
                placeholder="글 제목 작성"
                placeholderTextColor="#99a1af"
                value={title}
                onChangeText={setTitle}
                maxLength={100}
              />
            </View>

            {/* 본문 입력 필드 */}
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.contentInput}
                placeholder="본문 작성"
                placeholderTextColor="#99a1af"
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
                maxLength={5000}
              />
            </View>

            {/* 파일 업로드 버튼 */}
            <Pressable
              onPress={handleFileUploadPress}
              style={({ pressed }) => [
                styles.fileUploadButton,
                { opacity: pressed ? 0.8 : 1 }
              ]}
            >
              <View style={styles.fileUploadContent}>
                <UploadIcon size={20} color="#364153" />
                <Text style={styles.fileUploadText}>파일 업로드</Text>
              </View>
            </Pressable>

            {/* 업로드된 파일 목록 */}
            {files.length > 0 && (
              <View style={styles.filesSection}>
                <Text style={styles.filesSectionTitle}>업로드된 파일 ({files.length})</Text>
                {files.map((file, index) => (
                  <UploadedFileItem
                    key={`${file.uri}-${index}`}
                    name={file.name}
                    status="준비완료"
                    onRemove={() => handleRemoveFile(file.name)}
                    gradientColors={['#818cf8', '#a78bfa']}
                    containerStyle={styles.fileItemContainer}
                  />
                ))}
              </View>
            )}

            {/* 인용하기 버튼과 선택된 인용 게시글 */}
            <View style={styles.quoteSection}>
              <Pressable
                onPress={handleQuotePress}
                style={({ pressed }) => [
                  styles.quoteButton,
                  { opacity: pressed ? 0.8 : 1 }
                ]}
              >
                <Text style={styles.quoteButtonText}>인용하기</Text>
              </Pressable>
              
              {/* 선택된 인용 게시글 표시 */}
              {quotedPost && (
                <View style={styles.quotedPostContainer}>
                  <Text style={styles.quotedPostText}>{quotedPost.title}</Text>
                  <Pressable onPress={handleRemoveQuote} style={styles.quotedPostCloseButton}>
                    <XIcon size={18} color="#364153" />
                  </Pressable>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      {/* 인용할 게시글 선택 모달 */}
      <Modal
        visible={isQuoteModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseQuoteModal}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseQuoteModal}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>인용할 게시글 선택</Text>
            
            <View style={styles.postListContainer}>
              {QUOTABLE_POSTS.map((post) => (
                <Pressable
                  key={post.id}
                  onPress={() => handleSelectQuote(post)}
                  style={styles.postItem}
                >
                  <Text style={styles.postItemText}>{post.title}</Text>
                </Pressable>
              ))}
            </View>

            <Pressable onPress={handleCloseQuoteModal} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseText}>닫기</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FCFCFF',
  },
  keyboardView: {
    flex: 1,
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  completeButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  titleInput: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    fontSize: 18,
    fontWeight: '400',
    color: '#1e2939',
    lineHeight: 24,
    minHeight: 67,
  },
  textAreaContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  contentInput: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    fontSize: 16,
    fontWeight: '400',
    color: '#1e2939',
    lineHeight: 24,
    minHeight: 239,
  },
  fileUploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileUploadContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fileUploadText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#364153',
    lineHeight: 27,
  },
  quoteSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  quoteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quoteButtonText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#364153',
    lineHeight: 27,
  },
  filesSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  filesSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e2939',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  fileItemContainer: {
    marginHorizontal: -1, // container의 paddingHorizontal: 20을 상쇄하여 전체 너비 사용
    marginTop: 10,
  },
  quotedPostContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 0.582,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 20.578,
    paddingVertical: 0.582,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 49.161,
    flex: 1,
  },
  quotedPostText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#364153',
    lineHeight: 22.5,
    flex: 1,
  },
  quotedPostCloseButton: {
    width: 23.98,
    height: 23.98,
    borderRadius: 19536000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 0.582,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    paddingTop: 20.578,
    paddingBottom: 0.582,
    paddingHorizontal: 20.578,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e2939',
    lineHeight: 24,
    marginBottom: 12,
  },
  postListContainer: {
    gap: 8,
    marginBottom: 12,
  },
  postItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 0.582,
    borderColor: 'rgba(229, 231, 235, 0.5)',
    borderRadius: 12,
    paddingHorizontal: 12.58,
    paddingVertical: 17.24,
    minHeight: 49.161,
    justifyContent: 'center',
  },
  postItemText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#364153',
    lineHeight: 21,
  },
  modalCloseButton: {
    alignItems: 'center',
    paddingVertical: 8.33,
    minHeight: 36.989,
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6a7282',
    lineHeight: 21,
  },
});

