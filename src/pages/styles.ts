import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

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

    display: inline-block;

    ${p => p.theme.media.mobile} {
      font-size: 30px;
    }
  }
`;
