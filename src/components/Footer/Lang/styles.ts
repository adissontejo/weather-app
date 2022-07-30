import styled from 'styled-components';

export const Container = styled.a`
  > img {
    width: 20px;
    height: 20px;

    cursor: pointer;

    transition: transform 0.3s;

    :hover {
      transform: scale(1.2);
    }
  }
`;
