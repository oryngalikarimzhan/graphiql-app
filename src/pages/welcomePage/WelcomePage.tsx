import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import styles from './WelcomePage.module.scss';
import AuthWelcomeController from '../../components/auth-welcome-controller/AuthWelcomeController';
import iharImage from '../../assets/img/ihar2.jpg';
import oryngaliImage from '../../assets/img/oryngali.jpg';
import stepanImage from '../../assets/img/stepan.jpg';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../configs/FirebaseConfig';
import DeveloperCard from '../../components/developer-card/DeveloperCard';

const WelcomePage: FC = () => {
  const { t } = useTranslation();
  const [user, isLoading] = useAuthState(auth);

  return (
    <section className={classnames('wrapper', styles.welcome)}>
      <div className={styles.heading}>
        <h2>{t('final-project.name')}</h2>

        <p>{!user && !isLoading && t('final-project.description')}</p>

        <AuthWelcomeController />
      </div>

      <div className={styles.infoContent}>
        <h3 className={styles.textUnderline}>{t('course.name')}</h3>
        <p>{t('course.description')}</p>
      </div>

      <div className={styles.infoContent}>
        <h3 className={styles.textUnderline}>{t('project.name')}</h3>
        <p>{t('project.description')}</p>
      </div>

      <div className={styles.infoContent}>
        <h3 className={styles.textUnderline}>{t('developers')}</h3>
        <div className={styles.developersContainer}>
          <DeveloperCard
            image={iharImage}
            name="Ihar Antonenka"
            avatarLink="https://www.linkedin.com/in/ihar-antonenka-ba52371a5/"
            description={t('developer-card.ihar.description') || ''}
          />
          <DeveloperCard
            image={oryngaliImage}
            name="Oryngali Karimzhan"
            avatarLink="https://github.com/oryngalikarimzhan"
            description={t('developer-card.oryngali.description') || ''}
          />
          <DeveloperCard
            image={stepanImage}
            name="Stsiapan Zubik"
            avatarLink="https://www.linkedin.com/in/dkez/"
            description={t('developer-card.stepan.description') || ''}
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomePage;