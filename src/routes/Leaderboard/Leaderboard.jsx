import { useLoaderData } from "react-router-dom";
import styles from "./Leaderboard.module.css";
import { useState } from "react";

function Leaderboard() {
  const { puzzles } = useLoaderData();
  const [puzzleId, setPuzzleId] = useState(puzzles[0].id);

  return (
    <div className={styles.leaderboard}>
      <div className={styles.actions}>
        <h2 className={styles.title}>Leaderboard</h2>
        <div className={styles.choosePuzzle}>
          <div className={styles.choosePuzzleTitle}>Choose puzzle</div>
          <select className={styles.choosePuzzleDropdown} name="puzzleIds">
            {puzzles.map((puzzle) => {
              return (
                <option key={puzzle.id} value={puzzle.id}>
                  {puzzle.id}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.place}>Place</div>
          <div className={styles.username}>Name</div>
          <div className={styles.completionTime}>Completion Time</div>
          <div className={styles.completedAt}>Completed At</div>
        </div>
        {(() => {
          const puzzle = puzzles.find((puzzle) => puzzle.id === puzzleId);
          const leaderboard = puzzle.leaderboard;

          return leaderboard
            .sort((a, b) => a.completionTime - b.completionTime)
            .map((player, index) => {
              const date = new Date(player.completedAt);
              const day =
                date.getDate() + 1 < 10
                  ? `0${date.getDate() + 1}`
                  : date.getDate() + 1;
              const month =
                date.getMonth() + 1 < 10
                  ? `0${date.getMonth() + 1}`
                  : date.getMonth() + 1;
              const year = date.getFullYear();
              const hour = date.getHours();
              const minute = date.getMinutes();

              const formattedDate = `${day}-${month}-${year} ${hour}:${minute}`;
              const place = index + 1;

              return (
                <div className={styles.tableItem}>
                  <div
                    className={[
                      styles.place,
                      place === 1
                        ? styles.first
                        : place === 2
                          ? styles.second
                          : place === 3
                            ? styles.third
                            : "",
                    ].join(" ")}
                  >
                    {index + 1}
                  </div>
                  <div className={styles.username}>{player.username}</div>
                  <div className={styles.completionTime}>
                    {player.completionTime / 1000}s
                  </div>
                  <div className={styles.completedAt}>{formattedDate}</div>
                </div>
              );
            });
        })()}
      </div>
    </div>
  );
}

export default Leaderboard;
