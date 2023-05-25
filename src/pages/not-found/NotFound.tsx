import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import './NotFound.module.scss';

const NotFound: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="wrapper">
      <h1>{t('not-found')}</h1>
      <Link to="/main">{t('redirect')}</Link>
    </div>
  );
};

export default NotFound;
