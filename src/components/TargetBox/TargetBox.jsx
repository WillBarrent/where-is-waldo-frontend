import styles from "./TargetBox.module.css";

function TargetBox({ tagged, characters, onCharacterSelect }) {
  return (
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
        return character.isFound === true ? (
          <></>
        ) : (
          <TargetBoxCharacter
            key={character.id}
            character={character}
            onCharacterSelect={onCharacterSelect}
          />
        );
      })}
    </div>
  );
}

function TargetBoxCharacter({ character, onCharacterSelect }) {
  return (
    <div className={styles.targetBoxCharacterWrapper}>
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
        <div className={styles.targetBoxCharacterName}>{character.name}</div>
      </div>
    </div>
  );
}

export default TargetBox;
