import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  > header {
    padding: 50px 0 0;

    width: calc(100% - 40px);
    max-width: 1340px;

    display: flex;
    justify-content: flex-end;
  }
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

    color: white;
    font-size: 43px;
    text-align: center;

    display: inline-block;

    ${p => p.theme.media.mobile} {
      font-size: 30px;
    }
  }
`;
