import React from 'react';
import classnames from 'classnames';

import styles from './Footer.module.scss';
import rssReactLogoImage from '../../assets/img/rs-school-react.svg';
import { ReactComponent as GithubIcon } from '../../assets/icons/github-icon.svg';
import { githubAuthors } from '../../configs/constants';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={classnames('wrapper', styles.container)}>
        <p className={styles.copyright}>
          &copy; 2023 <span>GRAPHiQL</span>
        </p>

        <div className={styles.courseLogos}>
          <a href="https://rs.school/react/" target={'_blank'} rel="noreferrer">
            <img className={styles.rssLogo} src={rssReactLogoImage} alt="rss react logo" />
          </a>
        </div>

        <div className={styles.authors}>
          {Object.keys(githubAuthors).map((name) => (
            <a
              key={name}
              href={githubAuthors[name]}
              className={styles.githubLink}
              title={name}
              target={'_blank'}
              rel="noreferrer"
            >
              <GithubIcon className={styles.githubLogo} height={30} width={30} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
