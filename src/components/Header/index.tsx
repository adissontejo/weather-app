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
    <Container>
      {router.pathname !== '/' && (
        <Link href="/">
          <Back>
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
