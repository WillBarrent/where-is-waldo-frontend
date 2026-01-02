import styles from "./Header.module.css";
import WaldoIcon from "../../assets/waldo-icon.png";

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
          <li className={styles.navListItem}>Home</li>
          <li className={styles.navListItem}>Leaderboard</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
