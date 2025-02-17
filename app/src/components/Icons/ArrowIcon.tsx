import { SvgXml } from 'react-native-svg';

export function ArrowIcon() {
  const markup = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19" stroke="#9B40BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 5L19 12L12 19" stroke="#9B40BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>`;

  return <SvgXml xml={markup} />;
}
