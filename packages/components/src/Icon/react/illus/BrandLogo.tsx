import Svg, { SvgProps, G, Path, Defs, Rect, Use, ClipPath } from 'react-native-svg';
const SvgBrandLogo = (props: SvgProps) => (
    <Svg viewBox="0 0 128 128" width={props?.width} height={props?.height}>
    <G>
	<Path fill="#1355FF" d="M29.5,0h68.9C114.8,0,128,13.2,128,29.5v68.9c0,16.3-13.2,29.5-29.5,29.5H29.5C13.2,128,0,114.8,0,98.5V29.5
		C0,13.2,13.2,0,29.5,0z"/>
	<G>
		<Defs>
			<Rect id="SVGID_1_" x="24.6" y="27.1" width="78.7" height="75"/>
		</Defs>
		<clipPath id="SVGID_00000101826206355192482320000001128015041469319334_">
			<Use xlinkHref="#SVGID_1_"/>
		</clipPath>
		<G clipPath="url(#SVGID_00000101826206355192482320000001128015041469319334_)">
			<Path fill="#FFFFFF" d="M54.9,55.9c0.3-2,0.2-4-1.3-5.3c-0.8-0.7-2-0.9-3-0.7c-2,0.3-3.7,1.8-4.6,3.6c-0.9,1.8-1.3,3.8-1.4,5.9
				c-0.2,3.1-0.6,6.2-0.5,9.4c0.1,3.1,0.5,6.2,1.8,8.9c1.3,2.8,3.5,5.2,6.3,6.3c3.5,1.3,7.5,0.3,10.7-1.6c3.2-2,5.7-4.9,8.1-7.7
				c0.2,5.6,6,10,11.7,9.8c5.7-0.1,10.7-3.7,14.2-8.2c5.4-6.9,7.6-16.2,5.9-24.8c-1.7-8.6-7.4-16.3-15.2-20.5
				c-6-3.2-12.9-4.3-19.7-3.8c-17.8,1.3-35.9,11.3-41.6,29c-0.6,1.8-1,3.7-1.3,5.6c-1.4,9.2,0.8,18.9,6.5,26.2
				c4.3,5.4,10.4,9.3,16.9,11.5c6.5,2.2,13.6,2.8,20.5,2.4c7.4-0.5,14.8-2.1,21.7-4.9c3.2-1.3,6.4-2.9,8.4-5.7
				c-8.4,3.5-17.2,6.1-26.3,6.5s-18.4-1.3-26.2-6S32.7,79.3,31.2,70.3c-1-5.8,0-11.8,2.6-17c5.3-10.4,16.9-16.5,28.5-18
				c8-1,16.5-0.1,23.1,4.5c6,4.1,9.9,11,10.4,18.2c0.5,7.2-2.5,14.6-7.9,19.4c-2.7,2.4-6.7,4-9.5,0.8c-1.4-1.6-1.9-3.8-1.8-5.9
				c0.1-3.3,1.5-6.4,2-9.6c0.3-1.5,0.3-3.2-0.2-4.6c-0.5-1.5-1.8-2.7-3.4-2.9c-1.6-0.1-3.2,0.9-4,2.3c-0.9,1.4-1.2,3-1.6,4.6
				c-1,3.9-2.2,7.8-4.1,11.4c-1.2,2.2-2.7,4.3-4.9,5.5c-2.2,1.2-5.1,1.3-7-0.4c-5.2-4.7-1.9-12.7,0-18.1
				C54,59.3,54.6,57.6,54.9,55.9L54.9,55.9z"/>
		</G>
	</G>
</G>
</Svg>
);
export default SvgBrandLogo;
