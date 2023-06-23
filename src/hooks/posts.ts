import useSWR from "swr";
import { Post } from "../types";

const fetcher = (url: string): Promise<Post[]> =>
  fetch(url).then((res) => res.json());

export function usePosts() {
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:8000/posts`,
    fetcher
  );

  return {
    posts: data,
    isLoading,
    isError: error,
    mutate,
  };
}
