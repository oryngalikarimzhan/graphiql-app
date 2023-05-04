import styles from './Footer.module.scss';
import logoRss from '../../assets/img/logo-rs.svg';
import iconGithub from '../../assets/img/github-icon.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <a href="https://rs.school" target="blank">
          <img className={styles.logoRss} src={logoRss} alt="rss logo" />
        </a>
        <p className={styles.text}>2023</p>
        <div className={styles.ghContainer}>
          <a href="https://github.com/IharAnt">
            <img className={styles.github} src={iconGithub} alt="github icon" />
          </a>
          <a href="https://github.com/oryngalikarimzhan">
            <img className={styles.github} src={iconGithub} alt="github icon" />
          </a>
          <a href="https://github.com/Stepan9092">
            <img className={styles.github} src={iconGithub} alt="github icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
