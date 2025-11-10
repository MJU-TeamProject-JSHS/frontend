import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

export default function AIIcon({ size = 24, color = '#8B5CF6' }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Head */}
      <Rect x="6" y="7" width="12" height="10" rx="3" stroke={color} strokeWidth={2} />
      {/* Antenna */}
      <Path d="M12 5v2" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Circle cx="12" cy="4" r="1" fill={color} />
      {/* Eyes */}
      <Circle cx="9.5" cy="12" r="1.2" fill={color} />
      <Circle cx="14.5" cy="12" r="1.2" fill={color} />
      {/* Mouth */}
      <Path d="M9 14.5h6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}


