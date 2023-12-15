import Cell from "../Cell/Cell";
import { BoardShape } from "../../types/Boart";

interface Props {
  currentBoard: BoardShape;
}

export default function Board({ currentBoard }: Props) {
  return (
    <div className="board">
      {currentBoard.map((row, rowIndex) => (
        <div className="row" key={`${rowIndex}`}>
          {row.map((cell, colIndex) => {
            return <Cell key={`${rowIndex}-${colIndex}`} type={cell}></Cell>;
          })}
        </div>
      ))}
    </div>
  );
}
