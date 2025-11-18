import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import UserMdIcon from '../../assets/svgs/UserMdIcon';
import HeartIcon from '../../assets/svgs/HeartIcon';

export type PostData = {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  likeCount: number;
};

type Props = {
  post: PostData;
  onPress?: () => void;
};

// 날짜 포맷 함수 (상대 시간)
function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return '오늘';
    } else if (diffDays === 1) {
      return '1일 전';
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else if (diffDays < 14) {
      return '1주 전';
    } else if (diffDays < 21) {
      return '2주 전';
    } else {
      return `${Math.floor(diffDays / 7)}주 전`;
    }
  } catch {
    return '';
  }
}

export default function PostCard({ post, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, { opacity: pressed ? 0.9 : 1 }]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Text style={styles.title} numberOfLines={1}>
            {post.title}
          </Text>
          <View style={styles.metaRow}>
            <View style={styles.authorRow}>
              <UserMdIcon size={12} color="#6a7282" />
              <Text style={styles.metaText}>작성자: {post.author}</Text>
            </View>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.metaText}>{formatRelativeTime(post.createdAt)}</Text>
          </View>
        </View>
        <View style={styles.likeSection}>
          <HeartIcon size={24} color="#6a7282" />
          <Text style={styles.likeCount}>{post.likeCount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(229, 231, 235, 0.5)',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e2939',
    marginBottom: 8,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#6a7282',
    lineHeight: 18,
  },
  bullet: {
    fontSize: 12,
    color: '#6a7282',
  },
  likeSection: {
    alignItems: 'center',
    gap: 4,
  },
  likeCount: {
    fontSize: 11,
    color: '#6a7282',
    lineHeight: 16.5,
  },
});

