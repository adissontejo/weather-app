import styled from 'styled-components';

export const Container = styled.header`
  padding: 50px 50px 0;

  width: 100vw;

  display: flex;
  justify-content: flex-end;

  ${p => p.theme.media.mobile} {
    padding: 50px 20px 0;
  }
`;
