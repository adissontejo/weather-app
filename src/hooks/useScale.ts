import { useContext } from 'react';

import { ScaleContext } from '~/contexts';

export const useScale = () => {
  return useContext(ScaleContext);
};
