import styles from "./Success.module.css";
import { Link } from "react-router-dom";

function Success() {
  return (
    <div className={styles.completed}>
      <div className={styles.completedTitle}>
        You've completed puzzle in 5.2 seconds. Congratulations!
      </div>
      <form action="" className={styles.submitForm}>
        <div className={styles.yourName}>
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            type="text"
            className={styles.nameInput}
            placeholder="Waldo"
          />
        </div>
        <button className={styles.submitYourName}>Submit</button>
      </form>
      <Link className={styles.backToHomeLink} to={"/"}>
        Back to Home Page
      </Link>
    </div>
  );
}

export default Success;
