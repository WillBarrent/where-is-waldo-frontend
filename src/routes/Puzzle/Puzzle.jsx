import styles from "./Puzzle.module.css";

import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useSound from "use-sound";

import CorrectIcon from "../../assets/correct.png";
import WrongSound from "../../assets/wrong.mp3";
import CorrectSound from "../../assets/correct.mp3";

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
          return (
            <div
              key={character.id}
              className={
                character.isFound ? styles.characterFound : styles.character
              }
            >
              <img
                className={styles.characterImg}
                src={character.imageUrl}
                alt=""
              />
              {character.isFound ? (
                <img
                  className={styles.characterCorrectIcon}
                  src={CorrectIcon}
                  alt=""
                />
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>

      <div
        onClick={(e) => {
          setTagged({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
            center: { x: e.target.width / 2, y: e.target.height / 2 },
          });
        }}
        className={styles.puzzleImgContainer}
      >
        <img className={styles.puzzleImg} src={puzzle.imageUrl} alt="" />
        {tagged ? (
          <div
            style={{
              left: tagged.x,
              top: tagged.y,
              transform:
                tagged.x <= tagged.center.x && tagged.y <= tagged.center.y
                  ? "translate(0, 0)"
                  : tagged.x > tagged.center.x && tagged.y < tagged.center.y
                  ? "translate(-100%, 0)"
                  : tagged.x < tagged.center.x && tagged.y > tagged.center.y
                  ? "translate(0, -100%)"
                  : "translate(-100%, -100%)",
            }}
            className={styles.targetBox}
          >
            {characters.map((character) => {
              return (
                <div
                  key={character.id}
                  className={styles.targetBoxCharacterWrapper}
                >
                  <div
                    onClick={() => {
                      onCharacterSelect(character.name);
                    }}
                    className={styles.targetBoxCharacter}
                  >
                    <img
                      className={styles.targetBoxCharacterImg}
                      src={character.imageUrl}
                      alt=""
                    />
                    <div className={styles.targetBoxCharacterName}>
                      {character.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Puzzle;
