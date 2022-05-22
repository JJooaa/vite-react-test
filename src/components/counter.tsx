import { useReducer } from "react";

/* 
useState and useReducer do the same thing.
useState can be good for simple components
useReducer for bigger more complex components. ALL PREFERENCE THO 
You can write reducer logic in a seperate file 
*/

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
