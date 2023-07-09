import { useQuery } from "@tanstack/react-query";
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
  pageNumber: number;
  pageSize: number;
}

const usePost = (query: Props) => {
  return useData<Post[]>({
    endpoint: "/posts",
    key: ["Posts", query],
    params: {
      userId: query.userId,
      _limit: query.pageSize,
      _start: (query.pageNumber - 1) * query.pageSize,
    },
  });
};

export default usePost;
