import styled from 'styled-components';

export const Main = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h1 {
    font-size: 43px;
    text-transform: uppercase;
    letter-spacing: 0.14em;

    ${p => p.theme.media.mobile} {
      font-size: 29px;
    }
  }

  > .description {
    ${p => p.theme.media.mobile} {
      font-size: 14px;
    }
  }

  > .days {
    margin: 90px 0 0;

    display: flex;
    flex-direction: column;
    gap: 15px;

    ${p => p.theme.media.mobile} {
      margin: 17px 0 0;
    }
  }
`;

export const Day = styled.div`
  width: 100%;

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 135px 40px 50px 216px 50px auto;
  align-items: center;
  align-content: start;

  ${p => p.theme.media.mobile} {
    grid-template-columns: 100px 20px 20px 97px 20px;
  }

  > .date {
    text-transform: capitalize;

    ${p => p.theme.media.mobile} {
      font-size: 12px;
    }
  }

  > .temp-min,
  > .temp-max,
  > .description {
    font-size: 0.75rem;
  }

  > .temp-min {
    text-align: right;
  }

  > .gradient {
    margin: 0 20px;

    height: 3px;
    background: linear-gradient(to right, #b5c69b, #e0972a);
  }

  > .description {
    ${p => p.theme.media.mobile} {
      display: none;
    }
  }
`;
