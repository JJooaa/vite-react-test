import { ToastContainer } from "react-toastify";
import "./App.css";
import Counter from "./components/counter";
import Todo from "./components/todo";

/* 
Testing stuff. Use Reducer practice in components/counter.tsx
*/

const App = () => {
  return (
    <>
      <Counter />
      <Todo />
      <ToastContainer />
    </>
  );
};

export default App;
