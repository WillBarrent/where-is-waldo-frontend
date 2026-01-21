import styles from "./Header.module.css";
import WaldoIcon from "../../assets/waldo-icon.png";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerIcon}>
        <img
          className={styles.headerIconImg}
          width={100}
          src={WaldoIcon}
          alt=""
        />
        <div className={styles.headerTitle}>
          <span className={styles.headerTitlePrimary}>Where's </span>
          <span className={styles.headerTitleSecondary}>Waldo?</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navListItem}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.navListItemLinkActive : styles.navListItemLink
              }
              to={"/"}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.navListItem}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.navListItemLinkActive : styles.navListItemLink
              }
              to={"/leaderboard"}
            >
              Leaderboard
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
