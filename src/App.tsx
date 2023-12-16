import Board from "./components/Board/Board";
import { useTetris } from "./hooks/useTetris";
import UpcomingBlocks from "./components/UpcomingBlocks/UpcomingBlocks";

function App() {
  const { board, startGame, isPlaying, score, upcomingBlocks } = useTetris();

  return (
    <div className="app">
      <h1>Title</h1>
      <Board currentBoard={board} />
      <div className="controls">
        <h2>Score: {score}</h2>
        {isPlaying ? (
          <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
        ) : (
          <button onClick={startGame}>New Board</button>
        )}
      </div>
    </div>
  );
}

export default App;
