import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export const AlertaLogo = ({ width = 36, height = 36 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <Circle cx="12" cy="11" r="2.5" fill="white" stroke="none" />
    <Path d="M8.5 7a5 5 0 0 1 7 0" strokeWidth={1.5} />
    <Path d="M6.5 4.5a8 8 0 0 1 11 0" strokeWidth={1.5} />
  </Svg>
);
