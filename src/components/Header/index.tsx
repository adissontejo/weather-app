import Link from 'next/link';
import { useRouter } from 'next/router';

import { Scale } from '~/contexts';
import { useScale } from '~/hooks';

import { Back, Container } from './styles';
import { Switch } from '../Switch';

export const Header = () => {
  const router = useRouter();

  const { scale, setScale } = useScale();

  return (
    <Container data-testid="header-component">
      {router.pathname !== '/' && (
        <Link href="/">
          <Back data-testid="header-component-back" role="button">
            <img src="/icons/arrow-back.svg" alt="back" />
          </Back>
        </Link>
      )}
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
