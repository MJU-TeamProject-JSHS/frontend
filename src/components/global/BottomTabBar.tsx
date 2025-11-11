import React, { useMemo, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


import RobotFigmaIcon from '../../assets/svgs/RobotFigmaIcon';
import ClipboardListMdIcon from '../../assets/svgs/ClipboardListMdIcon';
import FolderOpenMdIcon from '../../assets/svgs/FolderOpenMdIcon';
import UserMdIcon from '../../assets/svgs/UserMdIcon';

export type TabKey = 'ai' | 'board' | 'library' | 'my';

type Props = {
  selectedKey?: TabKey;
  onChange?: (key: TabKey) => void;
};

export default function BottomTabBar({ selectedKey, onChange }: Props) {
  const [internalKey, setInternalKey] = useState<TabKey>('ai');
  const activeKey = selectedKey ?? internalKey;

  // 탭 바 아이콘과 라벨 추가
  const tabs = useMemo(
    () => [
      { key: 'ai' as const, label: 'AI', Icon: RobotFigmaIcon },
      { key: 'board' as const, label: '게시글', Icon: ClipboardListMdIcon },
      { key: 'library' as const, label: '자료실', Icon: FolderOpenMdIcon },
      { key: 'my' as const, label: '마이', Icon: UserMdIcon },
    ],
    []
  );

  const handlePress = (key: TabKey) => {
    if (onChange) onChange(key);
    else setInternalKey(key);
  };

  return (
    <View style={[styles.wrapper]}>
      <View style={styles.container}>
        {tabs.map(({ key, label, Icon }) => {
          const isActive = key === activeKey;
          return (
            <Pressable key={key} onPress={() => handlePress(key)} style={styles.item}>
              {isActive ? (
                <LinearGradient
                  colors={["#6366f1", "#a855f7", "#ec4899"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconBadge}
                >
                  <Icon size={20} color="#FFFFFF" />
                </LinearGradient>
              ) : (
                <View style={styles.iconBadgeGhost}>
                  <Icon size={20} color="#6B7280" />
                </View>
              )}
              <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
    // subtle shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  item: {
    flex: 1,
    height: 64,
    marginHorizontal: 4,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(168, 85, 247, 0.35)',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  iconBadgeGhost: {
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    color: '#111827',
  },
  labelActive: {
    color: '#111827',
    fontWeight: '600',
  },
});


