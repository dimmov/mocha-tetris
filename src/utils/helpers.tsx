import { Block, BoardShape, EmptyCell } from "../types/Board";
import { BlockShape } from "../types/Shapes";
import { BOARD_HEIGHT, BOARD_WIDTH, INITIAL_SEQUENCE } from "./constants";

export function getEmptyBoard(height = BOARD_HEIGHT): BoardShape {
  return Array(height)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(EmptyCell.Empty));
}

export function getRandomBlock(): Block {
  const blockValues = Object.values(Block).filter((v) => v !== Block.B);
  return blockValues[Math.floor(Math.random() * blockValues.length)];
}

export function getSequencedBlocks(): Block[] {
  return INITIAL_SEQUENCE as Block[];
}

export function rotateBlock(shape: BlockShape): BlockShape {
  const rows = shape.length;
  const columns = shape[0].length;

  const rotated = Array(rows)
    .fill(null)
    .map(() => Array(columns).fill(false));

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      rotated[column][rows - 1 - row] = shape[row][column];
    }
  }

  return rotated;
}

export function getPoints(numCleared: number): number {
  switch (numCleared) {
    case 0:
      return 0;
    case 1:
      return 100;
    case 2:
      return 300;
    case 3:
      return 500;
    case 4:
      return 800;
    default:
      throw new Error("Unexpected num of rows cleared;");
  }
}
