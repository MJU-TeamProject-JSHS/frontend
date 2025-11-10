import React from 'react';
import { TextProps } from 'react-native';
import Svg, { Defs, LinearGradient as SvgGradient, Stop, Text as SvgText } from 'react-native-svg';

type Props = TextProps & {
  colors: string[];
};

export default function GradientText({ colors, style, children, ...rest }: Props) {
  const text = String(children ?? '');
  // 기본 폰트 사이즈/라인하이트 추출
  const fontSize = (style as any)?.fontSize ?? 24;
  const lineHeight = (style as any)?.lineHeight ?? fontSize * 1.5;
  const fontWeight = (style as any)?.fontWeight ?? '700';
  const fontFamily = (style as any)?.fontFamily;

  return (
    <Svg height={lineHeight} /* width auto - let layout engine size container */>
      <Defs>
        <SvgGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          {colors.map((c, i) => (
            <Stop key={i} offset={`${(i / Math.max(colors.length - 1, 1)) * 100}%`} stopColor={c} />
          ))}
        </SvgGradient>
      </Defs>
      <SvgText
        {...(rest as any)}
        fill="url(#grad)"
        fontSize={fontSize}
        fontWeight={fontWeight as any}
        fontFamily={fontFamily}
        y={fontSize}
      >
        {text}
      </SvgText>
    </Svg>
  );
}


