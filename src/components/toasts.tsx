import { toast } from "react-toastify";

export const notify = (
  chosenTodo: { title: string; id: number },
  isCompleted: string
) => {
  toast(`${chosenTodo?.title} marked as ${isCompleted}`, {
    toastId: chosenTodo.id,
    progressClassName: "hello",
  });
};
