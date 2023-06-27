import styles from './header.module.css';

function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.brand}>MEGAROCKET</div>
      <div>
        <a id="login-bar-link" href={'/auth/login'} rel="noopener noreferrer">
          <img
            className={styles.logIn}
            src={`${process.env.PUBLIC_URL}/assets/images/log-in.svg`}
          />
        </a>
        <a
          id="facebook-bar-link"
          href={'https://www.facebook.com/radiumrocket'}
          target={'_blank'}
          rel="noreferrer"
        >
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
          />
        </a>
        <a
          id="twitter-bar-link"
          href={'https://twitter.com/radiumrocket'}
          target={'_blank'}
          rel="noreferrer"
        >
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
          />
        </a>
        <a
          id="instagram-bar-link"
          href={'https://www.instagram.com/radium.rocket/'}
          target={'_blank'}
          rel="noreferrer"
        >
          <img
            className={styles.socialIcon}
            src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
          />
        </a>
      </div>
    </header>
  );
}

export default Header;
