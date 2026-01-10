import styles from "./Character.module.css";
import CorrectIcon from "../../assets/correct.png";

function Character({ character }) {
  return (
    <div
      className={character.isFound ? styles.characterFound : styles.character}
    >
      <img className={styles.characterImg} src={character.imageUrl} alt="" />
      {character.isFound ? (
        <img className={styles.characterCorrectIcon} src={CorrectIcon} alt="" />
      ) : (
        <></>
      )}
      {character.isFound ? (
        <div className={styles.characterFoundTime}>
          {character.timer / 1000}s
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Character;
