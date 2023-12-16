export enum Block {
  B = "B",
  G = "G",
  S = "S",
  W = "W",
  SO = "SO",
  WO = "WO",
  GI = "GI",
  SOL = "SOL",
  M = "M",
}

export enum EmptyCell {
  Empty = "Empty",
}

export type CellOptions = Block | EmptyCell;

export type BoardShape = CellOptions[][];
