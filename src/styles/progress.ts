import { createGlobalStyle } from 'styled-components';

export const ProgressStyle = createGlobalStyle`
  #nprogress {
    pointer-events: none;

    .bar {
      background: white;

      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;

      width: 100%;
      height: 5px;
    }
  }
`;
