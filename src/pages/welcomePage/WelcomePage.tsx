import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WelcomePage.module.scss';
import AuthWelcomeController from '../../components/auth-welcome-controller/AuthWelcomeController';
import Avatar from '../../components/avatar/Avatar';
import avatarImage from '../../assets/img/avatar.jpeg';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/FirebaseConfig';
import DeveloperCard from '../../components/developer-card/DeveloperCard';

const WelcomePage: FC = () => {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);

  return (
    <div className="wrapper">
      <h2>Итоговый проект.</h2>
      <p>{!user && 'Главная страница доступна только зарегистрированным пользователям.'}</p>
      <AuthWelcomeController className={styles.authWelcome} />
      <div>
        <h3 className={styles.textUnderline}>Курс: RS School. React.</h3>
        <p>
          RS School - это образовательный проект, который проводит курсы по различным направлениям
          веб-разработки. Один из таких курсов - это курс по React. Курс предназначен для студентов
          RS School, которые прошли второй этап RS School и новых студентов с практическим опытом и
          знаниями JavaScript, TypeScript, Git, GitHub, CSS3 / HTML.
        </p>
      </div>
      <div>
        <h3 className={styles.textUnderline}>Проект: GraphiQL.</h3>
        <p>
          GraphiQL - это интерактивная среда разработки GraphQL в браузере. Она позволяет
          формировать запросы и исследовать схему GraphQL.
        </p>
      </div>
      <div>
        <h3 className={styles.textUnderline}>Разработчики.</h3>
        <div style={{ height: 200, width: 200 }}>
          <DeveloperCard
            image={avatarImage}
            name="Ihar Antonenka"
            avatarLink="https://www.linkedin.com/in/ihar-antonenka-ba52371a5/"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
