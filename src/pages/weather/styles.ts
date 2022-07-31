import styled from 'styled-components';

export const Main = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;

  > h1 {
    font-size: 43px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.14em;

    ${p => p.theme.media.mobile} {
      font-size: 29px;
    }
  }

  > .description {
    text-transform: capitalize;

    ${p => p.theme.media.mobile} {
      font-size: 14px;
    }
  }

  > .limits {
    font-size: 20px;
  }
`;

export const Display = styled.div`
  display: flex;
  align-items: center;

  > .temperature {
    font-size: 64px;

    ${p => p.theme.media.mobile} {
      font-size: 48px;
    }
  }

  > .icon {
    background: red;
  }
`;

export const More = styled.a`
  margin: 15px 0 0;

  color: white;
  font-size: 12px;
  text-decoration: underline;

  cursor: pointer;

  ${p => p.theme.media.mobile} {
    margin: 5px 0 0;
  }
`;
