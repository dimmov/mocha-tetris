import Board from "./components/Board/Board";
import { useTetris } from "./hooks/useTetris";
import UpcomingBlocks from "./components/UpcomingBlocks/UpcomingBlocks";
import ResultModal from "./components/ResultsModal/ResultModal";
import { useRef } from "react";

function App() {
  const { board, startGame, isPlaying, score, upcomingBlocks, isCompleted } =
    useTetris();

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
        <h1>Спаси МОЧА</h1>

        <Board currentBoard={board} />
        <div className="controls">
          <h2>Награда: {score} копейки</h2>
          {isPlaying ? (
            <UpcomingBlocks upcomingBlocks={upcomingBlocks.slice(5)} />
          ) : (
            <button onClick={startGame}>New Board</button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
