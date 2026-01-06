import styles from "./Home.module.css";
import { Link, useLoaderData } from "react-router-dom";

export async function puzzlesLoader() {
  const data = await fetch("http://localhost:3000/puzzles", {
    mode: "cors",
  });
  const puzzles = await data.json();

  return { puzzles };
}

function Home() {
  const { puzzles } = useLoaderData();

  return (
    <div className={styles.home}>
      {puzzles.length !== 0 ? <PuzzleList puzzles={puzzles} /> : <></>}
    </div>
  );
}

function PuzzleList({ puzzles }) {
  return (
    <div className={styles.puzzles}>
      {puzzles.map((puzzle) => {
        return (
          <div key={puzzle.id} className={styles.puzzle}>
            <Link to={"/puzzles/" + puzzle.id}>
              <img className={styles.puzzleImg} src={puzzle.imageUrl} alt="" />
            </Link>
            <h2 className={styles.puzzleNumber}>Puzzle {puzzle.id}</h2>
            <div className={styles.characters}>
              {puzzle.characters.map((character) => {
                return (
                  <div key={character.id} className={styles.character}>
                    <img
                      className={styles.characterImg}
                      src={character.imageUrl}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
