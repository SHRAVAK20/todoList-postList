import { Query, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import usePost from "./hooks/usePost";
import React from "react";

const PostList = () => {
  const pageSize = 10;
  const [userId, setUserId] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: posts,
    error,
    isLoading,
    fetchNextPage,
  } = usePost({ userId, pageSize });
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select
        className="form-select mb3"
        onChange={(event) => setUserId(parseInt(event.target.value))}
        value={userId}
      >
        <option value=""></option>
        <option value="1">User1</option>
        <option value="2">User2</option>
        <option value="3">User3</option>
      </select>
      <ul className="list-group">
        {posts?.pages.map((page) => (
          <React.Fragment>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
        {/* {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))} */}
      </ul>

      <button
        onClick={() => fetchNextPage()}
        className="btn btn-primary my-3 ms-2"
      >
        Load More ...
      </button>
    </>
  );
};

export default PostList;
