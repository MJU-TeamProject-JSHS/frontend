import React from 'react';
import Svg, { Path } from 'react-native-svg';

/**
 * RotateCwIcon - 시계 방향 회전 아이콘
 * 암기노트 카드의 뒤집기 안내에 사용되는 아이콘
 */
type Props = { size?: number; color?: string; strokeWidth?: number };

export default function RotateCwIcon({ size = 24, color = '#6a7282', strokeWidth = 2 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* 원형 화살표 경로 */}
      <Path
        d="M21 12a9 9 0 1 1-6.219-8.56"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 화살표 끝부분 */}
      <Path
        d="M21 3v6h-6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

