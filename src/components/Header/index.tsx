import { Scale } from '~/contexts';
import { useScale } from '~/hooks';

import { Container } from './styles';
import { Switch } from '../Switch';

export const Header = () => {
  const { scale, setScale } = useScale();

  return (
    <Container>
      <Switch<Scale>
        value={scale}
        disabledValue="F"
        enabledValue="C"
        disabledText="F°"
        enabledText="C°"
        onChange={setScale}
      />
    </Container>
  );
};
