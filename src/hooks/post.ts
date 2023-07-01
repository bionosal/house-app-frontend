import useSWR from "swr";

import { Post } from "../types";
import { API_URL } from "../config";

const fetcher = (url: string): Promise<Post[]> =>
  fetch(url).then((res) => res.json());

export function usePosts() {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_URL}/posts`,
    fetcher
  );

  return {
    posts: data,
    isLoading,
    isError: error,
    mutate,
  };
}
