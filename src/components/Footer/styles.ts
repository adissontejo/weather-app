import styled from 'styled-components';

export const Container = styled.footer`
  padding: 0 0 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;

  > .languages {
    display: flex;
    gap: 12px;
  }

  > small {
    font-size: 10px;
  }
`;
