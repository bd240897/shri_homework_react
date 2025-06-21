import React from 'react';
import { NavLink } from 'react-router';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logo}>
          <img className={styles.img} src="/brand.svg" alt="Логотип Митиевской школы" />
        </div>

        {/* Название сервиса */}
        <h3 className={styles.title}>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</h3>

        {/* Меню */}
        <nav className={styles.nav}>
          <NavLink className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)} to="/parsing" end>
            <img src="/analitics.svg" alt="CSV Аналитик" />
            CSV Аналитик
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)} to="/generation">
            <img src="/generator.svg" alt="CSV Генератор" />
            CSV Генератор
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? `${styles.navItem} ${styles.active}` : styles.navItem)} to="/history">
            <img src="/history.svg" alt="История" />
            История
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;