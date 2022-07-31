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
    overflow-x: hidden;
    overflow-y: auto;

    background: url(/icons/sky-background.png) no-repeat center;
    background-size: cover;
    background-attachment: fixed;
  }

  body, input, textarea, select, button {
    color: white;
    font: 400 1rem ${p => p.theme.fonts.primary}, sans-serif;
  }

  input, button, select {
    border: none;
    outline: none;
  }

  .app {
    width: 100vw;
    min-height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
