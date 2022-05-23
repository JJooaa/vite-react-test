import { useReducer, useEffect } from "react";
import "../App.css";
import Spinner from "./spinner";
import { notify } from "./toasts";

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
  const { type, id, payload } = action;
  let chosenTodo = state.todos.find((t) => t.id === id);
  let isCompleted = chosenTodo?.completed ? "undone" : "done";

  switch (type) {
    case "fetchTodos": {
      return { loading: !state.loading, todos: payload };
    }
    case "removeTodo": {
      return {
        todos: state.todos.filter((t: { id: number }) => t.id !== id),
      };
    }
    case "toggleCompletion": {
      chosenTodo && notify(chosenTodo, isCompleted);
      return {
        todos: state.todos.map((t) => {
          return t.id === id ? { ...t, completed: !t.completed } : t;
        }),
      };
    }
    default: {
      throw Error("reducer action.type is not valid ---> " + type);
    }
  }
};

const Todo = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "fetchTodos", payload: data }));
  }, []);

  if (state.loading) {
    return (
      <div className="relative h-screen w-full">
        <Spinner />
      </div>
    );
  }

  const firstLetterToUpperCase = (value: string) => {
    return [value[0].toUpperCase(), ...value.slice(1)];
  };

  return (
    <table className="mx-auto bg-slate-200 text-left">
      <thead>
        <tr>
          <th className="p-4 border-2 border-black">Id</th>
          <th className="p-4 border-2 border-black">Title</th>
          <th className="p-4 border-2 border-black">Completed</th>
        </tr>
      </thead>
      <tbody>
        {state.todos.map(
          (t: { title: string; completed: boolean; id: number }) => {
            return (
              <tr
                onClick={() => dispatch({ type: "toggleCompletion", id: t.id })}
                style={{
                  backgroundColor: t.completed ? "seagreen" : "initial",
                  color: t.completed ? "white" : "black",
                }}
              >
                <td className="p-4 border-2 border-black">{t.id}</td>
                <td className="p-4 border-2 border-black">
                  {firstLetterToUpperCase(t.title)}
                </td>
                <td className="p-4 border-2 border-black">
                  <code>{t.completed.toString()}</code>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default Todo;
