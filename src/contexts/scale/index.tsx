import { createContext, useLayoutEffect, useState } from 'react';

export type Scale = 'C' | 'F';

export type ScaleContextProps = {
  scale: Scale;
  setScale: (scale: Scale) => void;
  format: (kelvin: number, trunc?: 'round' | 'min' | 'max') => string;
};

export const ScaleContext = createContext({} as ScaleContextProps);

export const ScaleProvider = ({ children }) => {
  const [scale, setScale] = useState<Scale>('C');

  const format = (kelvin: number, trunc: 'round' | 'min' | 'max' = 'round') => {
    let t = kelvin - 273;

    if (scale === 'F') {
      t = (t * 9) / 5 + 32;
    }

    if (trunc === 'max') {
      t = Math.ceil(t);
    } else if (trunc === 'min') {
      t = Math.floor(t);
    } else {
      t = Math.round(t);
    }

    return `${t}°`;
  };

  return (
    <ScaleContext.Provider value={{ scale, setScale, format }}>
      {children}
    </ScaleContext.Provider>
  );
};
