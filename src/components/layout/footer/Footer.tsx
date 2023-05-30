import { FC } from 'react';
import classnames from 'classnames';

import styles from './Footer.module.scss';
import rssReactLogoImage from 'assets/img/rs-school-react.svg';
import { ReactComponent as GithubIcon } from 'assets/icons/github-icon.svg';
import { githubAuthor } from 'utils/constants/constants';
import { useLocation } from 'react-router-dom';

export const Footer: FC = () => {
  const { pathname } = useLocation();
  return pathname !== '/main' ? (
    <footer className={styles.footer}>
      <div className={classnames('wrapper', styles.container)}>
        <div className={styles.courseLogos}>
          <a href="https://rs.school/react/" target={'_blank'} rel="noreferrer">
            <img className={styles.rssLogo} src={rssReactLogoImage} alt="rss react logo" />
          </a>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>GRAPHiQL</h1>
          <p className={styles.copyright}>Copyright &copy; 2023</p>
        </div>

        <div className={styles.authors}>
          {Object.entries(githubAuthor).map(([key, value]) => (
            <a
              key={key}
              href={`${value}`}
              className={styles.githubLink}
              title={key}
              target={'_blank'}
              rel="noreferrer"
            >
              <GithubIcon className={styles.githubLogo} height={30} width={30} />
              <span>{key}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  ) : null;
};
