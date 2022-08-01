import { NextRouter } from 'next/router';

export const router = {
  pathname: '/',
  query: {},
  push: jest.fn(),
} as unknown as NextRouter;

export const useRouter = jest.fn(() => router);

export const nextRouter = {
  useRouter,
};
