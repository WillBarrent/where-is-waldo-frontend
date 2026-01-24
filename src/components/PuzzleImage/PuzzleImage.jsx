import TargetBox from "../TargetBox/TargetBox";
import styles from "./PuzzleImage.module.css";

function PuzzleImage({
  puzzle,
  tagged,
  characters,
  setTagged,
  onCharacterSelect,
}) {
  return (
    <div
      onClick={(e) => {
        const element = e.target.getBoundingClientRect();
        
        setTagged({
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          width: element.width,
          height: element.height,
          center: { x: e.target.width / 2, y: e.target.height / 2 },
        });
      }}
      className={styles.puzzleImgContainer}
    >
      <img className={styles.puzzleImg} src={puzzle.imageUrl} alt="" />
      {tagged ? (
        <TargetBox
          tagged={tagged}
          characters={characters}
          onCharacterSelect={onCharacterSelect}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default PuzzleImage;
