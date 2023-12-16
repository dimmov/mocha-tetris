import { Block } from "./Board";

export type BlockShape = boolean[][];

type ShapesObj = {
  [key in Block]: {
    shape: BlockShape;
  };
};

export const SHAPES: ShapesObj = {
  B: {
    shape: [
      // [false, false, false, false, false, false, false, false, false],
      // [false, false, false, false, false, false, false, false, false],
      // [false, false, false, false, false, false, false, false, false],
      // [false, false, false, false, false, false, false, false, false],
      // [false, false, false, false, false, false, false, false, false],
      // [false, false, false, false, false, false, false, false, false],
      [true, true, true, true, true, true, true, true, true],
      [false, true, true, true, true, true, true, true, false],
    ],
  },
  G: {
    shape: [
      [false, false, false, false],
      [false, true, true, true],
      [false, false, true, true],
      [false, false, true, true],
      [false, false, true, true],
    ],
  },
  S: {
    shape: [
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
    ],
  },
  W: {
    shape: [
      [false, true, true, false],
      [false, true, true, false],
      [false, true, true, false],
      [false, true, true, false],
    ],
  },
  SO: {
    shape: [
      [false, true, true],
      [false, true, true],
      [true, true, true],
    ],
  },
  WO: {
    shape: [
      [false, true, true, false, false, false],
      [false, true, true, false, false, false],
      [false, true, true, true, false, false],
      [false, true, true, true, false, false],
      [false, true, true, true, false, false],
      [false, false, false, true, false, false],
    ],
  },
  GI: {
    shape: [
      [false, true, true, true],
      [false, true, true, true],
      [false, true, true, false],
      [true, true, true, false],
    ],
  },
  SOL: {
    shape: [
      [false, false, false],
      [false, true, true],
      [true, true, true],
    ],
  },
  M: {
    shape: [
      [false, true, true, true],
      [true, true, true, false],
      [false, true, false, false],
      [false, true, false, false],
    ],
  },
};
