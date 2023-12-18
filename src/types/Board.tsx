export enum Block {
  B = "B",
  G = "G",
  W = "W",
  S = "S",
  SO = "SO",
  SOLD = "SOLD",
  WO = "WO",
  GI = "GI",
  SOL = "SOL",
  M = "M",
}

export enum EmptyCell {
  Empty = "Empty",
}

export type CellOptions = string;

export type BoardShape = CellOptions[][];
