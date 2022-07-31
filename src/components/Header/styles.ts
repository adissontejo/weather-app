import styled from 'styled-components';

export const Container = styled.header`
  padding: 50px 50px 20px;

  width: 100vw;

  display: flex;
  justify-content: flex-end;

  ${p => p.theme.media.mobile} {
    padding: 20px 20px 0 15px;
  }
`;

export const Back = styled.a`
  margin: 0 auto 0 0;

  cursor: pointer;

  > img {
    width: 44px;
    height: 44px;

    ${p => p.theme.media.mobile} {
      width: 24px;
      height: 24px;
    }
  }
`;
