import { useQuery } from "@tanstack/react-query";
import todoService, { Todo } from "../services/todoService";

const useTodos = () => {
  //  return useData<Todo[]>({ endpoint: "/todos", key: CACHE_KEY_TODOS });
  // const fetchTodos = () =>
  //   axios
  //     .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
  //     .then((res) => res.data);

  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: todoService.getAll,
    staleTime: 10 * 1000, //Stale time per query
  });
};

export default useTodos;
