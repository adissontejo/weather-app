import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  > small {
    color: #d9d9d9;
    font-size: 1rem;
  }

  > input {
    display: none;
  }
`;

export type ToggleProps = {
  enabled: boolean;
};

export const Toggle = styled.label<ToggleProps>`
  margin: 0 5px;

  > .track {
    position: relative;

    width: 50px;
    height: 30px;
    background: ${p => (p.enabled ? '#d2b3c1' : 'rgba(28, 36, 40, 0.49)')};
    border-radius: 20px;

    transition: background 0.3s;

    cursor: pointer;

    > .thumb {
      position: absolute;
      top: 5px;
      left: ${p => (p.enabled ? '25' : '5')}px;

      width: 20px;
      height: 20px;
      background: #d9d9d9;
      border-radius: 100%;

      transition: left 0.3s;
    }
  }
`;
