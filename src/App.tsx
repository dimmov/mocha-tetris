import Board from "./components/Board/Board";
import { useTetris } from "./hooks/useTetris";
import UpcomingBlocks from "./components/UpcomingBlocks/UpcomingBlocks";
import ResultModal from "./components/ResultsModal/ResultModal";
import { useRef } from "react";

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

  const dialog = useRef<HTMLDialogElement & { openModal(): void }>();

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
          <h1>
            МОЧА{" "}
            <span>
              {saved} - {lost}
            </span>{" "}
            Сорос
          </h1>
        </div>
        <Board currentBoard={board} />
        <div className="controls">
          {!isPlaying && <button onClick={startGame}>Спаси МОЧА</button>}

          {isPlaying && (
            <>
              <h2>Следващ елемент:</h2>
              <UpcomingBlocks upcomingBlocks={upcomingBlocks.slice(5)} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
