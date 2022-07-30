import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;

    margin: 0;
    padding: 0;
  }

  html {
    font-size: 20px;

    ${p => p.theme.media.mobile} {
      font-size: 16px;
    }
  }

  body {
    width: 100vw;
    height: 100vh;
    background: url(/sky-background.png) no-repeat center;
    background-size: cover;
  }

  body, input, textarea, select, button {
    color: white;
    font: 400 1rem ${p => p.theme.fonts.primary}, sans-serif;
  }

  input, button, select {
    border: none;
    outline: none;
  }
`;
