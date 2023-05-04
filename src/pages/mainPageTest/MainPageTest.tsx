import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './MainPageTest.module.scss';

const MainPageTest: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="wrapper">
      <h1>maintest</h1>
      <Link to="/main">{t('redirect')}</Link>
    </div>
  );
};

export default MainPageTest;
