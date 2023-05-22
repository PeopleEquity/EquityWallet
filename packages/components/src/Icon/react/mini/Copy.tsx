import Svg, { SvgProps, Path, Rect } from 'react-native-svg';
const SvgCog = (props: SvgProps) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Rect x="6.5" y="2.5" width="7" height="7" rx="1.5" stroke="#1355FF"/>
      <Path d="M4 6V6C2.89543 6 2 6.89543 2 8V12C2 13.1046 2.89543 14 4 14H8C9.10457 14 10 13.1046 10 12V12" stroke="#1355FF" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
);
export default SvgCog;
