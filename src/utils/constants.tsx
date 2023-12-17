import { Block } from "../types/Board";

export const BOARD_HEIGHT = 24;
export const BOARD_WIDTH = 21;

export const INITIAL_SEQUENCE: Array<keyof typeof Block> = [
  "M",
  "SOL",
  "GI",
  "WO",
  "SO",
  "W",
  "S",
  "G",
];
