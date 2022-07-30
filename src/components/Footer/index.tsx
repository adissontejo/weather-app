import { useTranslation } from 'next-i18next';

import { Lang } from './Lang';
import { Container } from './styles';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <div className="languages">
        <Lang code="pt-BR" />
        <Lang code="en" />
        <Lang code="es" />
      </div>
      <small>{t('lang')}</small>
    </Container>
  );
};
