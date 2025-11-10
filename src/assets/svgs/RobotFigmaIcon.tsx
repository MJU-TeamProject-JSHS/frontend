import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = { size?: number; color?: string };

// Figma 커스텀 로봇 아이콘 (ICONS_SVG_PATHS.md - svg-znex0hqym3.ts)
export default function RobotFigmaIcon({ size = 24, color = '#FFFFFF' }: Props) {
  // 원본은 20x20 뷰박스 기준
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M9.99775 6.66517V3.33258H6.66517"
        stroke={color}
        strokeWidth={1.66629}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.9966 6.66517H4.99888C4.07861 6.66517 3.33258 7.41119 3.33258 8.33146V14.9966C3.33258 15.9169 4.07861 16.6629 4.99888 16.6629H14.9966C15.9169 16.6629 16.6629 15.9169 16.6629 14.9966V8.33146C16.6629 7.41119 15.9169 6.66517 14.9966 6.66517Z"
        stroke={color}
        strokeWidth={1.66629}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.66629 11.664H3.33258"
        stroke={color}
        strokeWidth={1.66629}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.6629 11.664H18.3292"
        stroke={color}
        strokeWidth={1.66629}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.4972 10.8309V12.4972"
        stroke={color}
        strokeWidth={1.66629}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.49832 10.8309V12.4972"
        stroke={color}
        strokeWidth={1.66629}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


