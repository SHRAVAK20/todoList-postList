import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Post } from "./usePost";

interface Props {
  endpoint: string;
  key: string[];
}

const useData = <T>({ endpoint, key }: Props) => {
  const fetchDatas = () =>
    axios
      .get<T>(`https://jsonplaceholder.typicode.com${endpoint}`)
      .then((res) => res.data);

  return useQuery<T, Error>({
    queryKey: key,
    queryFn: fetchDatas,
    staleTime: 10 * 1000, //Stale time per query
  });
};

export default useData;
