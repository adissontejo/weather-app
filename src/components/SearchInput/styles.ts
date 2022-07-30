import styled, { css } from 'styled-components';

export type ContainerProps = {
  open: boolean;
};

export const Container = styled.div<ContainerProps>`
  position: relative;

  width: calc(100vw - 40px);
  max-width: 710px;

  > input {
    padding: 0 15px;

    width: 100%;
    height: 50px;
    background: rgba(255, 255, 255, 0.77);
    border-radius: 10px 10px ${p => (p.open ? '0 0' : '10px 10px')};

    color: #6aa2d1;
    font-size: 1.33rem;
    caret-color: #d2b3c1;
  }

  > .options {
    position: absolute;
    top: 50px;
    left: 0;

    margin: 1px 0 0;

    visibility: ${p => (p.open ? 'visible' : 'hidden')};
    width: 100%;
    background: rgba(255, 255, 255, 0.77);
    border-radius: 0 0 10px 10px;
    overflow: hidden;

    display: flex;
    flex-direction: column;

    transition: height 0.3s;
  }
`;

export type OptionProps = {
  hover: boolean;
};

export const Option = styled.button<OptionProps>`
  padding: 0 15px;

  width: 100%;
  height: 40px;
  background: transparent;

  color: ${p => (p.hover ? '#d2b3c1' : '#6aa2d1')};
  font-size: 1.33rem;
  text-align: left;

  cursor: pointer;
`;
