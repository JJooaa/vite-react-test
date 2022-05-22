import { useReducer, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const initialState = {
  todos: [],
  loading: false,
};

const todoReducer = (
  state: {
    todos: { completed: boolean; title: string; id: number; userId: number }[];
    loading?: boolean;
  },
  action: { type: string; id?: number; payload?: any; title?: string }
) => {
  const { type, id, payload, title } = action;
  let chosenTodo = state.todos.find((t) => t.id === id);
  let isCompleted = chosenTodo?.completed ? "undone" : "done";

  switch (type) {
    case "fetchData": {
      return { loading: !state.loading, todos: payload };
    }
    case "remove": {
      return {
        todos: state.todos.filter((t: { id: number }) => t.id !== id),
      };
    }
    case "completeTodo": {
      toast(`${title} marked as ${isCompleted}`, {
        toastId: id,
        progressStyle: { backgroundColor: "red" },
      });
      return {
        todos: state.todos.map((t) => {
          return t.id === id ? { ...t, completed: !t.completed } : t;
        }),
      };
    }
    default: {
      throw Error("Error " + type);
    }
  }
};

const Todo = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "fetchData", payload: data }));
  }, []);

  if (state.loading) {
    return <div>loading...</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {state.todos.map(
          (t: { title: string; completed: boolean; id: number }) => (
            <tr
              onClick={() =>
                dispatch({ type: "completeTodo", id: t.id, title: t.title })
              }
              style={{
                backgroundColor: t.completed ? "green" : "initial",
                color: t.completed ? "white" : "black",
              }}
            >
              <td>{t.title}</td>
              <td>{t.completed.toString()}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default Todo;
