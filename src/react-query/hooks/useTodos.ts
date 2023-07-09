import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useData from "./useData";

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {
  return useData<Todo[]>({ endpoint: "/todos", key: ["todos"] });
  // const fetchTodos = () =>
  //   axios
  //     .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
  //     .then((res) => res.data);
  // return useQuery<Todo[], Error>({
  //   queryKey: ["todos"],
  //   queryFn: fetchTodos,
  //   staleTime: 10 * 1000, //Stale time per query
  // });
};

export default useTodos;
