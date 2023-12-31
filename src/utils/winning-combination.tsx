import { Block, BoardShape, EmptyCell } from "../types/Board";

export const WINNING_COMBINATIONS: BoardShape = [
  [
    EmptyCell.Empty,
    EmptyCell.Empty,
    EmptyCell.Empty,
    Block.M,
    Block.M,
    Block.M,
    EmptyCell.Empty,
    EmptyCell.Empty,
    EmptyCell.Empty,
  ],
  [
    EmptyCell.Empty,
    EmptyCell.Empty,
    Block.M,
    Block.M,
    Block.M,
    EmptyCell.Empty,
    EmptyCell.Empty,
    EmptyCell.Empty,
    EmptyCell.Empty,
  ],
  [
    EmptyCell.Empty,
    EmptyCell.Empty,
    EmptyCell.Empty,
    Block.M,
    EmptyCell.Empty,
    EmptyCell.Empty,
    EmptyCell.Empty,
    EmptyCell.Empty,
    EmptyCell.Empty,
  ],
  [
    EmptyCell.Empty,
    EmptyCell.Empty,
    EmptyCell.Empty,
    Block.M,
    Block.SOL,
    Block.SOL,
    EmptyCell.Empty,
    EmptyCell.Empty,
    EmptyCell.Empty,
  ],
  [
    EmptyCell.Empty,
    EmptyCell.Empty,
    EmptyCell.Empty,
    Block.SOL,
    Block.SOL,
    Block.SOL,
    Block.WO,
    Block.WO,
    EmptyCell.Empty,
  ],
  [
    EmptyCell.Empty,
    Block.GI,
    Block.GI,
    Block.GI,
    Block.SO,
    Block.SO,
    Block.WO,
    Block.WO,
    EmptyCell.Empty,
  ],
  [
    EmptyCell.Empty,
    Block.GI,
    Block.GI,
    Block.GI,
    Block.SO,
    Block.SO,
    Block.WO,
    Block.WO,
    Block.WO,
  ],
  [
    EmptyCell.Empty,
    Block.GI,
    Block.GI,
    Block.SO,
    Block.SO,
    Block.SO,
    Block.WO,
    Block.WO,
    Block.WO,
  ],
  [
    Block.GI,
    Block.GI,
    Block.GI,
    Block.SOLD,
    Block.SOLD,
    Block.SOLD,
    Block.WO,
    Block.WO,
    Block.WO,
  ],
  [
    Block.GI,
    Block.G,
    Block.G,
    Block.SOLD,
    Block.SOLD,
    Block.SOLD,
    Block.W,
    Block.W,
    Block.WO,
  ],
  [
    EmptyCell.Empty,
    Block.G,
    Block.G,
    Block.S,
    Block.S,
    Block.S,
    Block.W,
    Block.W,
    EmptyCell.Empty,
  ],
  [
    EmptyCell.Empty,
    Block.G,
    Block.G,
    Block.S,
    Block.S,
    Block.S,
    Block.W,
    Block.W,
    EmptyCell.Empty,
  ],
  [
    EmptyCell.Empty,
    Block.G,
    Block.G,
    Block.S,
    Block.S,
    Block.S,
    Block.W,
    Block.W,
    EmptyCell.Empty,
  ],
  [
    Block.B,
    Block.B,
    Block.B,
    Block.B,
    Block.B,
    Block.B,
    Block.B,
    Block.B,
    Block.B,
  ],
  [
    EmptyCell.Empty,
    Block.B,
    Block.B,
    Block.B,
    Block.B,
    Block.B,
    Block.B,
    Block.B,
    EmptyCell.Empty,
  ],
];
