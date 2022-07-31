import Link from 'next/link';
import { useRouter } from 'next/router';

import { Container } from './styles';

export type LangProps = {
  code: string;
};

export const Lang = ({ code }: LangProps) => {
  const { pathname, query, asPath } = useRouter();

  return (
    <Link href={{ pathname, query }} as={asPath} locale={code}>
      <Container>
        <img src={`/icons/${code}.png`} alt={code} />
      </Container>
    </Link>
  );
};
