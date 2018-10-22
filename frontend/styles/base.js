import styledNormalize from 'styled-normalize'
import { injectGlobal } from 'styled-components'
import colors from './colors';

const base = () => injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Playfair+Display+SC');
  ${styledNormalize}

  html, body {
    padding: 0;
    font-family: 'Playfair Display SC';
    font-size: 16px;
    background-color: ${colors.white};
  }

  @media screen and (min-width: 20em) {
    html {
      font-size: calc(16px + 2 * ((100vw - 320px) / 704));
    }
  }
  @media screen and (min-width: 64em) {
    html {
      font-size: 18px;
    }
  }
`
export default base;