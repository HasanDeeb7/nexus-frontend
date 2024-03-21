import { useLoadingStore } from "../../Store/loadingStore";
import style from "./GameCard.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { FaPlaystation } from "react-icons/fa6";
import { LiaXbox } from "react-icons/lia";
import { LuPcCase } from "react-icons/lu";

function GameCard({
  game,
  onClick,
  miniCard = false,
  selectedGames = null,
  removeSelectedGame,
  isSelected = false,
  viewOnly = false,
}) {
  function renderPlatforms() {
    let result = [];
    let list = game.platforms;
    if (list.includes("PS")) {
      result.push(
        <FaPlaystation className={`${style.platfromIcon} ${style.psIcon}`} />
      );
    }
    if (list.includes("PC")) {
      result.push(
        <LuPcCase className={`${style.platfromIcon} ${style.pcIcon}`} />
      );
    }
    if (list.includes("Xbox")) {
      result.push(
        <LiaXbox className={`${style.platfromIcon} ${style.xboxIcon}`} />
      );
    }

    return result;
  }

  return miniCard ? (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={style.miniCardContainer}
      onClick={removeSelectedGame}
    >
      <div className={style.miniCardLayer}>
        <FaCircleXmark className={style.xMarkIcon} />
      </div>
      <figure>
        <img
          src={`${import.meta.env.VITE_ENDPOINT}${game.image}`}
          alt={game.name}
          className={style.miniImg}
        />
      </figure>
    </motion.div>
  ) : (
    <div className={`${style.gameCardContainer} ${viewOnly && style.readOnly}`}>
      <figure
        className={`${style.imageContainer} ${
          isSelected && style.disabledCard
        }`}
      >
        <AnimatePresence mode="wait">
          {isSelected ? (
            <motion.div
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ width: "100%", height: "100%", opacity: 1 }}
              exit={{ width: 0, height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              key={"card-layer"}
              className={style.gameCardLayer}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className={style.checkMarkIcon}
              >
                <FaCheckCircle />
              </motion.div>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
        <img
          src={`${import.meta.env.VITE_ENDPOINT}${game.image}`}
          alt={game.name}
          width={"100%"}
          className={style.gameImage}
          onClick={onClick}
        />

        <div className={style.helperText} onClick={onClick}>
          Add Game
        </div>
      </figure>
      <div className={style.gameInfo}>
        <p className={style.gameName}>{game.name}</p>
        <div className={style.playersPlatforms}>
          <p className={style.numberOfPlayes}>
            {game.users?.length || 0} Players
          </p>
          <div className={style.platformsContainer}>
            {renderPlatforms().map((item, idx) => {
              return <div key={idx}>{item}</div>;
            })}
          </div>
        </div>
      </div>
      <div className={style.gameGenres}>
        {game.genres.slice(0, 2).map((item, idx) => (
          <div className={style.gameGenre} key={idx}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameCard;
