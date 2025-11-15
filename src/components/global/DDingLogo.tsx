import React from 'react';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Text as SvgText } from 'react-native-svg';

// 고정 크기의 DDiNG 로고 컴포넌트 (단일 컴포넌트)
export default function DDingLogo(props: { color?: string }) {
  const text = 'DDiNG';
  const fontSize = 28;
  const lineHeight = 42;
  const fontWeight = '900';
  const fontFamily = 'Inter';
  const width = 100; // 충분한 여유 폭으로 고정
  const colors = [];
  if (props.color) {
    colors.push(props.color);
  } else {
    colors.push('#4f46e5');
    colors.push('#9333ea');
  }

  return (
    <Svg height={lineHeight} width={width}>
      <Defs>
        <SvgGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          {colors.map((c, i) => (
            <Stop key={i} offset={`${(i / Math.max(colors.length - 1, 1)) * 100}%`} stopColor={c} />
          ))}
        </SvgGradient>
      </Defs>
      <SvgText
        fill="url(#grad)"
        fontSize={fontSize}
        fontWeight={fontWeight as any}
        fontFamily={fontFamily}
        x={width / 2}
        y={fontSize}
        textAnchor="middle"
      >
        {text}
      </SvgText>
    </Svg>
  );
}


