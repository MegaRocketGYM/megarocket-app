import Header from 'Components/Header/index';
import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Sidebar from 'Components/Shared/Sidebar';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import Logo from 'assets/logo512.png';

const MemberView = () => {
  const routes = [
    { name: 'Home', link: '/members/home' },
    { name: 'Profile', link: '/members/profile' },
    { name: 'Schedule', link: '/members/schedule' },
    { name: 'Activities', link: '/members/activities' },
    { name: 'Memberships', link: '/members/memberships' }
  ];
  const chatMessage = 'Hola, qué tal? 🤝\nCómo podemos ayudarte?';

  return (
    <>
      <Header />
      <div className={styles.body}>
        <Sidebar routes={routes} />
        <Routes />
      </div>
      <FloatingWhatsApp
        phoneNumber="+59899548345"
        accountName="Mega Rocket Gym"
        avatar={Logo}
        statusMessage="Atención al cliente"
        placeholder="Escribe un mensaje"
        chatMessage={chatMessage}
        allowClickAway="true"
        darkMode="true"
      />
    </>
  );
};

export default MemberView;
