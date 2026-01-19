import { useState } from "react";
import styles from "./Success.module.css";
import { Link, useNavigate } from "react-router-dom";

function Success({ completionTime, puzzleId, playerId }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  async function onSubmit() {
    "use server";

    const data = await fetch("http://localhost:3000/leaderboard", {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        playerId: playerId,
        puzzleId: puzzleId,
      }),
    });

    return navigate("/");
  }

  return (
    <div className={styles.completed}>
      <div className={styles.completedTitle}>
        You've completed puzzle in {completionTime} seconds. Congratulations!
      </div>
      <form action={onSubmit} className={styles.submitForm}>
        <div className={styles.yourName}>
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            type="text"
            className={styles.nameInput}
            placeholder="Waldo"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <button type="submit" className={styles.submitYourName}>
          Submit
        </button>
      </form>
      <Link className={styles.backToHomeLink} to={"/"}>
        Back to Home Page
      </Link>
    </div>
  );
}

export default Success;
