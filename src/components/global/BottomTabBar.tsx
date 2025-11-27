import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import RobotFigmaIcon from '../../assets/svgs/RobotFigmaIcon';
import ClipboardListMdIcon from '../../assets/svgs/ClipboardListMdIcon';
import FolderOpenMdIcon from '../../assets/svgs/FolderOpenMdIcon';
import UserMdIcon from '../../assets/svgs/UserMdIcon';

export type TabKey = 'ai' | 'board' | 'library' | 'my';

// 탭 키와 화면 이름 매핑
const TAB_TO_SCREEN: Record<TabKey, string> = {
  ai: 'AiHome',
  board: 'BoardList',
  library: 'ScrapList',
  my: 'MyPageMain',
};

const SCREEN_TO_TAB: Record<string, TabKey> = {
  'AiHome': 'ai',
  'BoardList': 'board',
  'ScrapList': 'library',
  'MyPageMain': 'my',
};

export default function BottomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  // state가 없거나 routes가 없으면 null 반환
  if (!state || !state.routes || state.routes.length === 0) {
    return null;
  }

  const activeRoute = state.routes[state.index];
  if (!activeRoute) {
    return null;
  }

  const activeKey = SCREEN_TO_TAB[activeRoute.name] || 'ai';
  
  // 탭 화면이 아니면 바텀 탭 숨기기 (스택 내부 화면)
  if (!SCREEN_TO_TAB[activeRoute.name]) {
    return null;
  }

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
    const screenName = TAB_TO_SCREEN[key];
    const route = state.routes.find(r => r.name === screenName);
    
    if (route) {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    }
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


