import "./App.css";
import PostList from "./react-query/PostList";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";

function App() {
  return (
    <>
      {/* <TodoList />
      <h1>POSTS</h1> */}
      <TodoForm />
      <TodoList />
    </>
  );
}

export default App;
