import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="wrapper">
      <h2>{t('not-found.page')}</h2>
      <Link to="/">{t('not-found.redirect')}</Link>
    </div>
  );
};

export default NotFound;
