import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BottomTabBar, { TabKey } from '../../components/global/BottomTabBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


const FIXED_CREATED_AT = '2025.11.21 16:20';

const LOCAL_FILES = [
  {
    module: require('../../../assets/demo/5-6주차 60242053 임서빈.pdf'),
    name: '5-6주차 60242053 임서빈.pdf',
  },
];

const COPY = {
  title: '공학수학 5,6주차 과제 손풀이',
  author: '운영자',
  body: `공학수학 5,6주차 과제 파일입니다. 틀린문제 포함입니다! 6장 난이도가 좀 있는 듯 합니다....\n\n 다들 시험 공부 화이팅!\n\n`,
  attachHeader: '첨부 파일',
  hint: '이 게시글이 도움이 되셨나요?',
};

export default function BoardDetailScreen() {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [tab, setTab] = useState<TabKey>('board');
  const [liked, setLiked] = useState(false);
  const [scrapped, setScrapped] = useState(false);

  const likeCount = liked ? 123 : 122;

  return (
    <LinearGradient
      colors={[
        'rgba(238, 242, 255, 0.95)',
        'rgba(250, 245, 255, 0.95)',
        'rgba(253, 242, 248, 0.95)',
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.page}
    >
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={styles.headerBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="arrow-left" size={24} color="#1E2939" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setScrapped(v => !v)}
            activeOpacity={0.6}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons
              name={scrapped ? 'bookmark' : 'bookmark-outline'}
              size={26}
              color={scrapped ? '#615FFF' : '#4A5565'}
            />
          </TouchableOpacity>

        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{COPY.title}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaGroup}>
              <Feather name="user" size={16} color="#4A5565" />
              <Text style={styles.metaText}>{COPY.author}</Text>
            </View>

            <Text style={styles.metaDot}>•</Text>

            <View style={styles.metaGroup}>
              <Feather name="clock" size={16} color="#4A5565" />
              <Text style={styles.metaText}>{FIXED_CREATED_AT}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bodyCard}>
          <Text style={styles.bodyText}>{COPY.body}</Text>
        </View>

        <View style={styles.attachBlock}>
          <Text style={styles.sectionTitle}>{COPY.attachHeader}</Text>

          {LOCAL_FILES.map((f, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('PDFViewer', {
                  pdfModule: f.module,
                  fileName: f.name,
                })
              }
            >
              <LinearGradient
                colors={['#FCE7F3', '#FFE4E6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.fileBtn}
              >
                <View style={styles.fileLeft}>
                  <LinearGradient
                    colors={['#FB64B6', '#FF637E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.fileIconBadge}
                  >
                    <Feather name="file-text" size={20} color="#fff" />
                  </LinearGradient>

                  <Text style={styles.fileName}>{f.name}</Text>
                </View>

                <Feather name="download" size={20} color="#4A5565" />
              </LinearGradient>

              <Text style={styles.fileSub}>
                {Platform.OS === 'ios' ? '열기/공유' : '열기/다운로드'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionsWrap}>
          <Text style={styles.actionsHint}>{COPY.hint}</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setLiked(v => !v)}
          >
            <LinearGradient
              colors={['#FFF1F2', '#FDF2F8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.likeBtnBase,
                liked ? styles.likeBtnActive : styles.likeBtnIdle,
              ]}
            >
              <Feather
                name="thumbs-up"
                size={liked ? 22 : 20}
                color={liked ? '#FB2C36' : '#6A7282'}
              />
              <Text style={[styles.likeTextBase, liked ? styles.likeTextActive : styles.likeTextIdle]}>
                {likeCount}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomTabBar selectedKey={tab} onChange={setTab} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    borderBottomWidth: 0.582217,
    borderBottomColor: 'rgba(229, 231, 235, 0.5)',
  },
  headerRow: {
    height: 39.99,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: {
    width: 39.99,
    height: 39.99,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrapBtn: {
    width: 35.99,
    height: 35.99,
    padding: 7.996,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.66629,
  },
  scrapBtnIdle: {
    backgroundColor: 'transparent',
    borderColor: '#4A5565',
  },
  scrapBtnActive: {
    backgroundColor: '#615FFF',
    borderColor: '#615FFF',
  },
  scrapTouchArea: {
  justifyContent: 'center',
  alignItems: 'center',
},

  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 140,
    gap: 12,
  },
  titleBlock: {
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 30,
    letterSpacing: 0.0703125,
    color: '#1E2939',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    lineHeight: 20,
    letterSpacing: -0.0761719,
    color: '#4A5565',
  },
  metaDot: {
    fontSize: 13,
    lineHeight: 20,
    color: '#4A5565',
  },

  bodyCard: {
    paddingTop: 24.5805,
    paddingHorizontal: 24.5805,
    paddingBottom: 0.582217,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderWidth: 0.582217,
    borderColor: 'rgba(229, 231, 235, 0.5)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    letterSpacing: -0.234375,
    color: '#364153',
  },

  attachBlock: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: -0.150391,
    color: '#364153',
  },
  fileBtn: {
    height: 73.14,
    borderRadius: 18,
    borderWidth: 0.582217,
    borderColor: '#FCCEE8',
    paddingHorizontal: 15.9928,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fileIconBadge: {
    width: 39.99,
    height: 39.99,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: -0.234375,
    color: '#1E2939',
  },
  fileSub: {
    marginTop: 6,
    fontSize: 12,
    color: '#6B7280',
  },

  actionsWrap: {
    height: 83.31,
    borderRadius: 20,
    borderWidth: 0.582217,
    borderColor: 'rgba(229, 231, 235, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingHorizontal: 19.9955,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  actionsHint: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.150391,
    color: '#4A5565',
    flex: 1,
    marginRight: 12,
  },

  likeBtnBase: {
    height: 42.16,
    borderRadius: 9999,
    borderWidth: 0.582217,
    borderColor: '#FFCCD3',
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeBtnIdle: {
    width: 84.68,
    paddingLeft: 15.9928,
    paddingRight: 12,
    gap: 8,
  },
  likeBtnActive: {
    width: 85.02,
    paddingLeft: 14.993,
    paddingRight: 12,
    gap: 7,
  },
  likeTextBase: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: -0.150391,
  },
  likeTextIdle: {
    color: '#364153',
  },
  likeTextActive: {
    color: '#FB2C36',
  },
});
