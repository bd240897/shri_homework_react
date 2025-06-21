import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  return (
    <div className={styles.page}>
      <Header className={styles.header} />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer className={styles.footer} />
    </div>
  );
};

export default MainLayout;
