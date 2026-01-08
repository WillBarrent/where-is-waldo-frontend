import styles from "./Puzzle.module.css";

import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useSound from "use-sound";

import WrongSound from "../../assets/wrong.mp3";
import CorrectSound from "../../assets/correct.mp3";
import PuzzleImage from "../../components/PuzzleImage/PuzzleImage";
import Character from "../../components/Character/Character";

export async function puzzleByIdLoader({ params }) {
  const puzzleId = params.puzzleId;
  const data = await fetch("http://localhost:3000/puzzles/" + puzzleId, {
    mode: "cors",
  });
  const puzzle = await data.json();

  return { puzzle };
}

function Puzzle() {
  const { puzzle } = useLoaderData();

  const [playWrong] = useSound(WrongSound);
  const [playCorrect] = useSound(CorrectSound);

  const [characters, setCharacters] = useState(
    puzzle.characters.map((character) => {
      return {
        ...character,
        isFound: false,
      };
    })
  );
  const [tagged, setTagged] = useState(false);

  function onCharacterSelect(characterName) {
    let inside = false;

    const character = characters.filter(
      (character) => character.name === characterName
    );
    const coordinates = character[0].coordinates.map((coords) => [
      coords.coordX,
      coords.coordY,
    ]);

    const x = tagged.x;
    const y = tagged.y;

    for (
      let i = 0, j = coordinates.length - 1;
      i < coordinates.length;
      j = i++
    ) {
      const x0 = coordinates[i][0];
      const y0 = coordinates[i][1];
      const x1 = coordinates[j][0];
      const y1 = coordinates[j][1];

      if (y0 > y != y1 > y && x < ((x1 - x0) * (y - y0)) / (y1 - y0) + x0) {
        inside = !inside;
      }
    }

    if (inside) {
      playCorrect();
      setCharacters(
        characters.map((ch) => {
          if (character[0].id === ch.id) {
            return {
              ...ch,
              isFound: inside,
            };
          }

          return {
            ...ch,
          };
        })
      );
    } else {
      playWrong();
    }
  }

  return puzzle !== null ? (
    <div
      onClick={(e) => {
        if (!e.target.className.includes("puzzleImg")) {
          setTagged(false);
        }
      }}
      className={styles.puzzle}
    >
      <div className={styles.characters}>
        {characters.map((character) => {
          return <Character key={character.id} character={character} />;
        })}
      </div>

      <PuzzleImage
        puzzle={puzzle}
        characters={characters}
        tagged={tagged}
        setTagged={setTagged}
        onCharacterSelect={onCharacterSelect}
      />
    </div>
  ) : (
    <></>
  );
}

export default Puzzle;
