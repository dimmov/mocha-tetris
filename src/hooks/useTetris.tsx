import { useCallback, useEffect, useState } from "react";
import { hasCollisions, hasCompleted, useTetrisBoard } from "./useTetrisBoard";
import { useInterval } from "./useInterval";
import { Block, BoardShape, EmptyCell } from "../types/Board";
import { BlockShape, SHAPES } from "../types/Shapes";
import { BOARD_HEIGHT } from "../utils/constants";
import {
  getPoints,
  getRandomBlock,
  getSequencedBlocks,
} from "../utils/helpers";

enum TickSpeed {
  Normal = 800,
  Sliding = 100,
  Fast = 50,
}

export function useTetris() {
  const [score, setScore] = useState(0);
  const [upcomingBlocks, setUpcomingBlocks] = useState<Block[]>([]);
  const [isCommitting, setIsCommitting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tickSpeed, setTickSpeed] = useState<TickSpeed | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [savedCounter, setSavedCounter] = useState(0);
  const [lostCounter, setLostCounter] = useState(0);

  const [
    { board, droppingRow, droppingColumn, droppingBlock, droppingShape },
    dispatchBoardState,
  ] = useTetrisBoard();

  const commitPosition = useCallback(() => {
    if (!hasCollisions(board, droppingShape, droppingRow + 1, droppingColumn)) {
      setIsCommitting(false);
      setTickSpeed(TickSpeed.Normal);
      return;
    }

    const newBoard = structuredClone(board);
    addShapeToBoard(
      newBoard,
      droppingBlock,
      droppingShape,
      droppingRow,
      droppingColumn
    );

    let numCleared = 0;

    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
      if (newBoard[row].every((entry) => entry !== EmptyCell.Empty)) {
        numCleared++;
        newBoard.splice(row, 1);
      }
    }
    const newUpcomingBlocks = structuredClone(upcomingBlocks) as Block[];
    const newBlock = newUpcomingBlocks.pop() as Block;
    newUpcomingBlocks.unshift(getRandomBlock());

    if (hasCollisions(board, SHAPES[newBlock].shape, 0, 3)) {
      setIsPlaying(false);
      setTickSpeed(null);
      if (hasCompleted(board)) {
        setIsCompleted(true);
        setSavedCounter((prev) => prev + score + 100);
      } else {
        setLostCounter((prev) => prev + score + 1);
      }
    } else {
      setTickSpeed(TickSpeed.Normal);
    }

    setUpcomingBlocks(newUpcomingBlocks);
    setScore((prevScore) => prevScore + getPoints(numCleared));
    setTickSpeed(TickSpeed.Normal);
    dispatchBoardState({ type: "commit", newBoard, newBlock });
    setIsCommitting(false);
  }, [
    board,
    dispatchBoardState,
    droppingBlock,
    droppingColumn,
    droppingRow,
    droppingShape,
    upcomingBlocks,
    score,
  ]);

  const gameTick = useCallback(() => {
    if (isCommitting) {
      commitPosition();
    } else if (
      hasCollisions(board, droppingShape, droppingRow + 1, droppingColumn)
    ) {
      setTickSpeed(TickSpeed.Sliding);
      setIsCommitting(true);
    } else {
      dispatchBoardState({ type: "drop" });
    }
  }, [
    board,
    commitPosition,
    dispatchBoardState,
    droppingColumn,
    droppingRow,
    droppingShape,
    isCommitting,
  ]);

  useInterval(() => {
    if (!isPlaying) return;

    gameTick();
  }, tickSpeed);

  const startGame = useCallback(() => {
    const startingBlocks = getSequencedBlocks();
    setScore(0);
    setUpcomingBlocks(startingBlocks);
    setIsCommitting(false);
    setIsPlaying(true);
    setIsCompleted(false);
    setTickSpeed(TickSpeed.Normal);
    dispatchBoardState({ type: "start" });
  }, [dispatchBoardState]);

  const renderedBoard = structuredClone(board);

  if (isPlaying) {
    addShapeToBoard(
      renderedBoard,
      droppingBlock,
      droppingShape,
      droppingRow,
      droppingColumn
    );
  }

  function addShapeToBoard(
    board: BoardShape,
    droppingBlock: Block,
    droppingShape: BlockShape,
    droppingRow: number,
    droppingColumn: number
  ) {
    droppingShape
      .filter((row) => row.some((isSet) => isSet))
      .forEach((row: boolean[], rowIndex: number) => {
        row.forEach((isSet: boolean, colIndex: number) => {
          if (isSet) {
            board[droppingRow + rowIndex][droppingColumn + colIndex] =
              `${droppingBlock} ${droppingBlock}${rowIndex}-${colIndex}`;
          }
        });
      });
  }

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let isPressingLeft = false;
    let isPressingRight = false;
    let moveIntervalId: number | undefined;

    const updateMovementInterval = () => {
      clearInterval(moveIntervalId);
      dispatchBoardState({
        type: "move",
        isPressingLeft,
        isPressingRight,
      });

      moveIntervalId = setInterval(() => {
        dispatchBoardState({
          type: "move",
          isPressingLeft,
          isPressingRight,
        });
      }, 300);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }
      if (event.key === "ArrowDown") {
        setTickSpeed(TickSpeed.Fast);
      }

      if (event.key === "ArrowLeft") {
        dispatchBoardState({
          type: "move",
          isPressingLeft: true,
        });
      }

      if (event.key === "ArrowRight") {
        dispatchBoardState({
          type: "move",
          isPressingRight: true,
        });
      }

      if (event.key === "ArrowLeft") {
        isPressingLeft = true;
      }

      if (event.key === "ArrowRight") {
        isPressingRight = true;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setTickSpeed(TickSpeed.Normal);
      }

      if (event.key === "ArrowLeft") {
        isPressingLeft = false;
        updateMovementInterval();
      }

      if (event.key === "ArrowRight") {
        isPressingRight = false;
        updateMovementInterval();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      setTickSpeed(TickSpeed.Normal);
    };
  }, [dispatchBoardState, isPlaying]);

  return {
    board: renderedBoard,
    startGame,
    isPlaying,
    score,
    upcomingBlocks,
    isCompleted,
    saved: savedCounter,
    lost: lostCounter,
  };
}
