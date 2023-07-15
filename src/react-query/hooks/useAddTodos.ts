import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "./useTodos";
import axios from "axios";
import { CACHE_KEY_TODOS } from "../constant";

interface PreviousTodo {
  previousTodo: Todo[];
}

const useAddTodos = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  const addTodoMutation = useMutation<Todo, Error, Todo, PreviousTodo>({
    mutationFn: (todo: Todo) => {
      return axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data);
    },
    onMutate: (newTodo: Todo) => {
      const previousTodo = queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS);
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) => [
        newTodo,
        ...(todos || []),
      ]);
      //if (ref.current) ref.current.value = "";
      onAdd();
      return { previousTodo };
    },
    onSuccess: (updated_Id_In_Mytodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(
        CACHE_KEY_TODOS,
        (todos) =>
          todos?.map((todo) =>
            todo === newTodo ? updated_Id_In_Mytodo : todo
          ) || []
      );

      // todos.map((todo)=> todo === newTodo ? [])
    },

    onError: (error, todo, context) => {
      if (!context) return;
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) => [
        ...(context.previousTodo || []),
      ]);
    },
  });
  return addTodoMutation;
};

export default useAddTodos;
