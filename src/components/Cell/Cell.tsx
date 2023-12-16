import { CellOptions } from "../../types/Board";

interface Props {
  type: CellOptions;
}
export default function Cell({ type }: Props) {
  return <div className={`cell ${type}`}></div>;
}
