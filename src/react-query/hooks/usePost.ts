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

const usePost = () => {
  return useData<Post[]>({ endpoint: "/posts", key: ["Posts"] });
};

export default usePost;
