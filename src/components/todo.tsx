import { useReducer, useEffect } from "react";

const initialState = {
  todos: [],
  loading: false,
};

const todoReducer = (
  state: {
    todos: { completed: boolean; title: string; id: number; userId: number }[];
    loading?: boolean;
  },
  action: { type: string; id?: number; payload?: any }
) => {
  const { type, id, payload } = action;
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
    const res = () =>
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "fetchData", payload: data }));
    res();
  }, []);

  if (state.loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      {state.todos.map(
        (t: { title: string; id: number; completed: boolean }, i: number) => (
          <div
            style={{ backgroundColor: t.completed ? "green" : "initial" }}
            key={i}
            onClick={() => dispatch({ type: "completeTodo", id: t.id })}
          >
            <p>{t.title}</p>
            <p>{t.completed ? "true" : "false"}</p>
          </div>
        )
      )}
    </>
  );
};

export default Todo;
