import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useData from "./useData";
import { CACHE_KEY_TODOS } from "../constant";
import apiClient from "../services/apiClient";

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const getApiClient = new apiClient<Todo>("/todos");

const useTodos = () => {
  //  return useData<Todo[]>({ endpoint: "/todos", key: CACHE_KEY_TODOS });
  // const fetchTodos = () =>
  //   axios
  //     .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
  //     .then((res) => res.data);

  return useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: getApiClient.getAll,
    staleTime: 10 * 1000, //Stale time per query
  });
};

export default useTodos;
