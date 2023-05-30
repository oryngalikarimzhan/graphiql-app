import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import styles from './Landing.module.scss';
import { LinkButton } from 'components/common/buttons/link-button/LinkButton';
import { useUserAuthStore } from 'features/auth/userAuthStore';

const Landing: FC = () => {
  const { t } = useTranslation();
  const user = useUserAuthStore((state) => state.user);

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

          <LinkButton to={user ? '/main' : '/registration'}>{t('landing.start-button')}</LinkButton>
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
