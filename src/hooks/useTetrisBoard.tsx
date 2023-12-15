import { Dispatch, useReducer } from "react";
import { Block, BoardShape, EmptyCell } from "../types/Boart";
import { BlockShape, SHAPES } from "../types/Shapes";
import { BOARD_HEiGHT, BOARD_WIDTH } from "../utils/constants";

export type BoardState = {
  board: BoardShape;
  droppingRow: number;
  droppingColumn: number;
  droppingBlock: Block;
  droppingShape: BlockShape;
};

type Action = {
  type: "start" | "drop" | "commit" | "move";
};

export function useTetrisBoard(): [BoardState, Dispatch<Action>] {
  const [boardState, dispatchBoardState] = useReducer(
    boardReducer,
    {
      board: [],
      droppingRow: 0,
      droppingColumn: 0,
      droppingBlock: Block.I,
      droppingShape: SHAPES.I.shape,
    },
    (emptyState) => {
      const state = {
        ...emptyState,
        board: getEmptyBoard(),
      };

      return state;
    }
  );

  return [boardState, dispatchBoardState];
}

export function getEmptyBoard(height = BOARD_HEiGHT): BoardShape {
  return Array(height)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(EmptyCell.Empty));
}

function boardReducer(state: BoardState, action: Action): BoardState {
  const newState = { ...state };

  switch (action.type) {
    case "start":
      const firstBlock = getRandomBlock();
      return {
        board: getEmptyBoard(),
        droppingRow: 0,
        droppingColumn: 3,
        droppingBlock: firstBlock,
        droppingShape: SHAPES[firstBlock].shape,
      };
    case "drop":
      newState.droppingRow++;
      break;
    case "commit":
    case "move":
    default:
      const unhandledType: string = action.type;
      throw new Error("Unhandled action type:" + unhandledType);
  }

  return newState;
}

function getRandomBlock(): Block {
  const blockValues = Object.values(Block);
  return blockValues[Math.floor(Math.random() * blockValues.length)];
}

export function hasCollisions(
  board: BoardShape,
  currentShape: BlockShape,
  row: number,
  column: number
): boolean {
  let hasCollisions = false;

  currentShape
    .filter((shapeRow) => shapeRow.some((isSet) => isSet))
    .forEach((shapeRow: boolean[], rowIndex: number) => {
      shapeRow.forEach((isSet: boolean, colIndex: number) => {
        const isOutOfBorder =
          row + rowIndex >= board.length ||
          column + colIndex >= board[0].length ||
          column + colIndex < 0;
        const hasABlock =
          board[row + rowIndex][column + colIndex] !== EmptyCell.Empty;
        if (isSet && (isOutOfBorder || hasABlock)) {
          hasCollisions = true;
        }
      });
    });

  return hasCollisions;
}
