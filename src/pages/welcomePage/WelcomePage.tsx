import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WelcomePage.module.scss';
import AuthWelcomeController from '../../components/auth-welcome-controller/AuthWelcomeController';
import Avatar from '../../components/avatar/Avatar';
import avatarImage from '../../assets/img/avatar.jpeg';

const WelcomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="wrapper">
      <h2>Итоговый проект курса RS School React 2022Q3</h2>
      <AuthWelcomeController className={styles.authWelcome} />
      <div style={{ height: 100, width: 100 }}>
        <Avatar image={avatarImage}></Avatar>
      </div>
    </div>
  );
};

export default WelcomePage;
