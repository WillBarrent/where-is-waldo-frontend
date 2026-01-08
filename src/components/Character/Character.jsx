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
    </div>
  );
}

export default Character;
