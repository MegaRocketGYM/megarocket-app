import React from 'react';
import styles from './landing.module.css';
import stylesJoin from './join.module.css';
import Footer from 'Components/Footer';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ContactForm from './Form';
import Header from 'Components/Shared/Header/index';
import Carrousel from './Carrousel';

const Landing = () => {
  const history = useHistory();
  const handleRegister = () => {
    history.push('/auth/register');
  };

  return (
    <div className={styles.body}>
      <Header />
      <div className={styles.container}>
        <div className={styles.imgPortrait}>
          <div className={styles.overlay}>
            <div className={styles.content}>
              <img src="/assets/images/logos/logo-4.png" alt="gym image" />
              <p>it&apos;s gym &#8226; it&apos;s life</p>
            </div>
          </div>
        </div>
        <div className={stylesJoin.joinButtonDiv}>
          <button type="submit" onClick={handleRegister}>
            join our gym
          </button>
        </div>
        <Carrousel />
        <div className={stylesJoin.joined}>
          <p>be fit</p>
          <p className={stylesJoin.dot}>&nbsp;&#8226;&nbsp;</p>
          <p>be happy</p>
          <p className={stylesJoin.dot}>&nbsp;&#8226;&nbsp;</p>
          <p>be megarocket</p>
        </div>
        <div className={stylesJoin.landscape}>
          <button type="submit" className={stylesJoin.joinButtonJoin} onClick={handleRegister}>
            <span>join</span>
          </button>
          <button type="submit" className={stylesJoin.joinButtonNow} onClick={handleRegister}>
            <span>now</span>
          </button>
        </div>
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
