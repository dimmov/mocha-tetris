import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  isCompleted: boolean;
  onReset(): void;
  score: number;
}
const ResultModal = forwardRef(function ResultModal(
  { isCompleted, onReset, score }: Props,
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      openModal() {
        dialog.current?.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {isCompleted && (
        <div>
          <h2>Ти спаси МОЧА!</h2>
          <h3>
            Премия: <strong>+1000 копейки</strong>
            <br />
            Общо: <strong>{score + 1000} копейки</strong>
          </h3>
        </div>
      )}
      {!isCompleted && (
        <div>
          <h2>Жълтопаветник!</h2>
          <h3>
            Подаяние: <strong>+1 копейкa</strong>
            <br />
            Общо: {score + 1} копейк{score + 1 === 1 ? "a" : "и"}
          </h3>
        </div>
      )}

      <form method="dialog" onSubmit={onReset}>
        <button type="submit">
          {isCompleted ? "Спаси отново" : "Опитай да се поправиш"}
        </button>
      </form>
    </dialog>,
    document.getElementById("modal")!
  );
});

export default ResultModal;
