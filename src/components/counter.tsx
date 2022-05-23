import { useReducer } from "react";

const reducer = (state: { count: number }, action: { type: string }) => {
  switch (action.type) {
    case "increment": {
      return {
        count: state.count + 1,
      };
    }
    case "decrement": {
      return {
        count: state.count - 1,
      };
    }
    default: {
      throw Error("Invalid action.type " + action.type);
    }
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
};

export default Counter;
