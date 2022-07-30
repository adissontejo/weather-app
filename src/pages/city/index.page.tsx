import { useRouter } from 'next/router';

import { Container } from './styles';

const City = () => {
  const router = useRouter();

  const { q } = router.query;

  return (
    <Container>
      <h1>{q}</h1>
    </Container>
  );
};

export default City;
