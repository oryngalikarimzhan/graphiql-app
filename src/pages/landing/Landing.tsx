import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import styles from './Landing.module.scss';
import { StartButton } from 'features/auth/start-button/StartButton';

const Landing: FC = () => {
  const { t } = useTranslation();

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

          <StartButton />
        </article>

        <article className={styles.article}>
          <h3 className={styles.textUnderline}>{t('landing.project.name')}</h3>
          <p className={styles.infoContent}>{t('landing.project.description')}</p>
        </article>
        <article className={styles.article}>
          <h3 className={styles.textUnderline}>{t('landing.project.name')}</h3>
          <p className={styles.infoContent}>{t('landing.project.description')}</p>
        </article>
        <article className={styles.article}>
          <h3 className={styles.textUnderline}>{t('landing.project.name')}</h3>
          <p className={styles.infoContent}>{t('landing.project.description')}</p>
        </article>
      </div>
    </section>
  );
};

export default Landing;
