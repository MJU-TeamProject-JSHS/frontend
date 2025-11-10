import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

type Props = { size?: number; color?: string };

export default function UserMdIcon({ size = 24, color = '#9CA3AF' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={2} />
    </Svg>
  );
}


