import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) => {
      return axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },
    onSuccess: (updated_Id_In_Mytodo) => {
      //Invalidate cache

      // queryClient.invalidateQueries(['todo']);

      //Update Cache
      console.log(updated_Id_In_Mytodo);
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        updated_Id_In_Mytodo,
        ...(todos || []),
      ]);

      if (ref.current) ref.current.value = "";
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodoMutation.error && (
        <div className="alert alert-danger">
          {addTodoMutation.error.message}
        </div>
      )}

      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          if (ref.current && ref.current.value)
            addTodoMutation.mutate({
              id: 0,
              title: ref.current.value,
              userId: 1,
              completed: true,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            disabled={addTodoMutation.isLoading}
          >
            {addTodoMutation.isLoading ? "Adding....." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
