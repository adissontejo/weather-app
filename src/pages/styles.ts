import styled from 'styled-components';

export const Main = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  > h1 {
    padding: 0 20px;

    font-size: 43px;
    text-align: center;
    letter-spacing: 0.14em;

    display: inline-block;

    ${p => p.theme.media.mobile} {
      font-size: 30px;
      letter-spacing: 0;
    }
  }
`;
