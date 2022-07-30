import { ScaleProvider } from './scale';

export const ContextProvider = ({ children }) => {
  return <ScaleProvider>{children}</ScaleProvider>;
};

export * from './scale';
