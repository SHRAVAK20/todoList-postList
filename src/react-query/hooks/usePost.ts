import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import useData from "./useData";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface Props {
  userId: number | undefined;
  pageSize: number;
}

const usePost = (query: Props) => {
  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            userId: query.userId,
            _limit: query.pageSize,
            _start: (pageParam - 1) * query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 10 * 1000, //Stale time per query
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePost;

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React from "react";
// import useData from "./useData";

// export interface Post {
//   id: number;
//   title: string;
//   body: string;
//   userId: number;
// }

// export interface Props {
//   userId: number | undefined;
//   pageNumber: number;
//   pageSize: number;
// }

// const usePost = (query: Props) => {
//   return useData<Post[]>({
//     endpoint: "/posts",
//     key: ["Posts", query],
//     params: {
//       userId: query.userId,
//       _limit: query.pageSize,
//       _start: (query.pageNumber - 1) * query.pageSize,
//     },
//   });
// };

// export default usePost;
