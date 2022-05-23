import { ToastContainer } from "react-toastify";
import "./App.css";
import Counter from "./components/counter";
import Todo from "./components/todo";
import "react-toastify/dist/ReactToastify.css";
/* 
Testing stuff. Use Reducer practice in components/todo.tsx
*/

/* 
useState and useReducer do the same thing.
useState can be good for simple components
useReducer for bigger more complex components. ALL PREFERENCE THO 
You can write reducer logic in a seperate file 
*/

const App = () => {
  return (
    <>
      {/* <Counter /> */}
      <Todo />
      <ToastContainer />
    </>
  );
};

export default App;
