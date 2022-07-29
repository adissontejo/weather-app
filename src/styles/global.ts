import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;

    margin: 0;
    padding: 0;
  }

  body {
    width: 100vw;
    height: 100vh;
    background: url(./sky-background.png) no-repeat center;
    background-size: cover;
  }

  body, input, textarea, select {
    font-family: ${p => p.theme.fonts.primary}, sans-serif;
  }
`;
