import { useRef } from "react";
import useAddTodos from "./hooks/useAddTodos";

const TodoForm = () => {
  const addTodoMutation = useAddTodos(() => {
    if (ref.current) ref.current.value = "";
  });
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodoMutation.error && (
        <div className="alert alert-danger">
          {addTodoMutation.error?.message}
        </div>
      )}

      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value)
            addTodoMutation.mutate({
              id: 0,
              title: ref?.current?.value,
              userId: 1,
              completed: true,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
