import Board from "./components/Board/Board";
import { useTetris } from "./hooks/useTetris";
import UpcomingBlocks from "./components/UpcomingBlocks/UpcomingBlocks";
import ResultModal from "./components/ResultsModal/ResultModal";
import { useRef, useState } from "react";
import solutionImage from "./assets/solution.png";

function App() {
  const {
    board,
    startGame,
    isPlaying,
    saved,
    lost,
    score,
    upcomingBlocks,
    isCompleted,
  } = useTetris();
  const [showHelp, setShowHelp] = useState(false);
  const dialog = useRef<HTMLDialogElement & { openModal(): void }>();

  function toggleHelp() {
    setShowHelp((prev) => !prev);
  }

  if (!isPlaying) {
    dialog.current?.openModal();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        isCompleted={isCompleted}
        score={score}
        onReset={startGame}
      />
      <div className="app">
        <div className="title">
          <button
            className="btn help-btn"
            onClick={toggleHelp}
            title="Помощ от приятел"
          >
            <i className="fa fa-question"></i>
          </button>
          <h1>
            МОЧА{" "}
            <span>
              {saved} - {lost}
            </span>{" "}
            Сорос
          </h1>
          <button
            className="btn help-btn"
            onClick={startGame}
            title={!isPlaying ? "Започни играта" : "Рестартирай играта"}
          >
            <i className={`fa ${!isPlaying ? "fa-play" : "fa-refresh"}`}></i>
          </button>
        </div>
        <Board currentBoard={board} />
        <div className="controls">
          {showHelp && (
            <img
              className="solution-image"
              src={solutionImage}
              alt="Помощ Решение"
            />
          )}
          {isPlaying && (
            <>
              <h2>Следващ елемент:</h2>{" "}
              <UpcomingBlocks upcomingBlocks={upcomingBlocks.slice(6)} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
