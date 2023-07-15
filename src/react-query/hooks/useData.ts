import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  endpoint: string;
  key: any[];
  params?: any;
}

const useData = <T>({ endpoint, key, params }: Props) => {
  const fetchDatas = () =>
    axios
      .get<T>("https://jsonplaceholder.typicode.com" + endpoint, {
        params: params,
      })
      .then((res) => res.data);

  return useQuery<T, Error>({
    queryKey: key,
    queryFn: fetchDatas,
    staleTime: 10 * 1000, //Stale time per query
    keepPreviousData: true,
  });
};

export default useData;

// .get<T>(`https://jsonplaceholder.typicode.com${endpoint}`)
