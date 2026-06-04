import React from 'react';
import { Homepage as HomepageBase } from '../tracklete-home/Homepage';

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800;900&family=Barlow:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
.font-display { font-family: 'Barlow Condensed', sans-serif !important; letter-spacing: -0.01em !important; }
.font-body    { font-family: 'Barlow', sans-serif !important; }
body, html    { font-family: 'Barlow', sans-serif !important; }
`;

export function Homepage() {
  return <HomepageBase fontOverride={FONT_CSS} />;
}

export default Homepage;
