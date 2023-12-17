import { Dispatch, useReducer } from "react";
import { Block, BoardShape, EmptyCell } from "../types/Board";
import { BlockShape, SHAPES } from "../types/Shapes";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../utils/constants";
import { getEmptyBoard, rotateBlock } from "../utils/helpers";
import { WINNING_COMBINATIONS } from "../utils/winning-combination";

export type BoardState = {
  board: BoardShape;
  droppingRow: number;
  droppingColumn: number;
  droppingBlock: Block;
  droppingShape: BlockShape;
};

type Action = {
  type: "start" | "drop" | "commit" | "move";
  newBoard?: BoardShape;
  newBlock?: Block;
  isPressingLeft?: boolean;
  isPressingRight?: boolean;
  isRotating?: boolean;
};

export function useTetrisBoard(): [BoardState, Dispatch<Action>] {
  const [boardState, dispatchBoardState] = useReducer(
    boardReducer,
    {
      board: [],
      droppingRow: 0,
      droppingColumn: 0,
      droppingBlock: Block.B,
      droppingShape: SHAPES.B.shape,
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

function boardReducer(state: BoardState, action: Action): BoardState {
  const newState = { ...state };

  switch (action.type) {
    case "start":
      // eslint-disable-next-line no-case-declarations
      return {
        board: getEmptyBoard(),
        droppingRow: BOARD_HEIGHT - SHAPES[Block.B].shape.length,
        droppingColumn: Math.floor(
          (BOARD_WIDTH - SHAPES[Block.B].shape[0].length) / 2
        ),
        droppingBlock: Block.B,
        droppingShape: SHAPES[Block.B].shape,
      };
    case "drop":
      newState.droppingRow++;
      break;
    case "commit":
      return {
        board: [
          ...getEmptyBoard(BOARD_HEIGHT - action.newBoard!.length),
          ...action.newBoard!,
        ],
        droppingRow: 0,
        droppingColumn: 3,
        droppingBlock: action.newBlock!,
        droppingShape: SHAPES[action.newBlock as Block].shape,
      };
    case "move":
      // eslint-disable-next-line no-case-declarations
      const rotatedShape = action.isRotating
        ? rotateBlock(newState.droppingShape)
        : newState.droppingShape;

      // eslint-disable-next-line no-case-declarations
      let columnOffset = action.isPressingLeft ? -1 : 0;
      columnOffset = action.isPressingRight ? 1 : columnOffset;
      if (
        !hasCollisions(
          newState.board,
          rotatedShape,
          newState.droppingRow,
          newState.droppingColumn + columnOffset
        )
      ) {
        newState.droppingColumn += columnOffset;
        newState.droppingShape = rotatedShape;
      }
      break;
    default:
      // eslint-disable-next-line no-case-declarations
      const unhandledType: string = action.type;
      throw new Error("Unhandled action type:" + unhandledType);
  }

  return newState;
}

export function hasCollisions(
  board: BoardShape,
  currentShape: BlockShape,
  row: number,
  column: number
): boolean {
  let hasCollision = false;
  currentShape
    .filter((shapeRow) => shapeRow.some((isSet) => isSet))
    .forEach((shapeRow: boolean[], rowIndex: number) => {
      shapeRow.forEach((isSet: boolean, colIndex: number) => {
        if (
          isSet &&
          (row + rowIndex >= board.length ||
            column + colIndex >= board[0].length ||
            column + colIndex < 0 ||
            board[row + rowIndex][column + colIndex] !== EmptyCell.Empty)
        ) {
          hasCollision = true;
        }
      });
    });

  if (hasCompleted(board)) {
    hasCollision = true;
  }
  return hasCollision;
}

export function hasCompleted(
  board: BoardShape,
  winningCombinations: BoardShape = WINNING_COMBINATIONS
): boolean {
  let hasCompleted = false;
  const boardAsStr = board
    .flat()
    .filter((a) => a !== EmptyCell.Empty)
    .join("");
  const winningPattern = winningCombinations
    .flat()
    .filter((a) => a !== EmptyCell.Empty)
    .join("");

  if (boardAsStr === winningPattern) {
    hasCompleted = true;
  }
  return hasCompleted;
}
