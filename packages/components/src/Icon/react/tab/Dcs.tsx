import Svg, { SvgProps, Rect } from 'react-native-svg';
const Dcs = (props: SvgProps) => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Rect x="2" y="10" width="4" height="8" stroke="black"/>
    <Rect x="8" y="6" width="4" height="12" stroke="black"/>
    <Rect x="14" y="2" width="4" height="16" stroke="black"/>
  </Svg>
);
export default Dcs;
