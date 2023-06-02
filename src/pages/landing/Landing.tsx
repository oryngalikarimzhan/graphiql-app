import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import styles from './Landing.module.scss';
import { FancyButton } from 'components/common/buttons/fancy-button/FancyButton';
import { useAuth } from 'features/auth/AuthProvider';

const Landing: FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <section className={styles.landing}>
      <div className={classnames('wrapper', styles.articles)}>
        <article className={styles.article}>
          <h2
            className={classnames(styles.layeredText, styles.headingTitle)}
            data-text={'GRAPHiQL'}
          >
            GRAPHiQL
          </h2>

          <Link to={user ? '/playground' : '/signup'}>
            <FancyButton>{t('landing.start-button')}</FancyButton>
          </Link>
        </article>

        {/* <article className={styles.article}>
          <h3 className={styles.textUnderline}>{t('landing.project.name')}</h3>
          <p className={styles.infoContent}>{t('landing.project.description')}</p>
        </article> */}
      </div>
    </section>
  );
};

export default Landing;
