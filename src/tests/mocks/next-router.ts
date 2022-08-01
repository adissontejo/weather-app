import { NextRouter } from 'next/router';

export const router = {
  pathname: '/',
} as NextRouter;

export const useRouter = jest.fn(() => router);

export const nextRouter = {
  useRouter,
};
