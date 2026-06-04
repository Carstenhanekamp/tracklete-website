import React from 'react';
import { Homepage as HomepageBase } from '../tracklete-home/Homepage';

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
.font-display { font-family: 'Plus Jakarta Sans', sans-serif !important; letter-spacing: -0.03em !important; }
.font-body    { font-family: 'Plus Jakarta Sans', sans-serif !important; }
body, html    { font-family: 'Plus Jakarta Sans', sans-serif !important; }
`;

export function Homepage() {
  return <HomepageBase fontOverride={FONT_CSS} />;
}

export default Homepage;
