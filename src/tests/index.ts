import '@testing-library/jest-dom';

import { nextRouter } from './mocks';

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  ...nextRouter,
}));
