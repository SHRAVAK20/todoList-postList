import { Query, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import usePost from "./hooks/usePost";

const PostList = () => {
  const pageSize = 10;
  const [userId, setUserId] = useState<number>();
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: posts,
    error,
    isLoading,
  } = usePost({ userId, pageNumber, pageSize });
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
        {posts?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        disabled={pageNumber === 1}
        onClick={() => setPageNumber(pageNumber - 1)}
        className="btn btn-primary my-3"
      >
        Previus
      </button>
      <button
        onClick={() => setPageNumber(pageNumber + 1)}
        className="btn btn-primary my-3 ms-2"
      >
        next
      </button>
    </>
  );
};

export default PostList;
