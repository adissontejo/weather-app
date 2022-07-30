import { createContext, Dispatch, SetStateAction, useState } from 'react';

export type Scale = 'C' | 'F';

export type ScaleContextProps = {
  scale: Scale;
  setScale: Dispatch<SetStateAction<Scale>>;
  format: (kelvin: number) => string;
};

export const ScaleContext = createContext({} as ScaleContextProps);

export const ScaleProvider = ({ children }) => {
  const [scale, setScale] = useState<Scale>('C');

  const format = (kelvin: number) => {
    const celsius = kelvin - 273;

    if (scale === 'C') {
      return `${Math.round(celsius)}°`;
    }

    return `${Math.round((celsius * 9) / 5 + 32)}°`;
  };

  return (
    <ScaleContext.Provider value={{ scale, setScale, format }}>
      {children}
    </ScaleContext.Provider>
  );
};
