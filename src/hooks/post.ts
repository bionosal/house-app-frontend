import useSWR from "swr";

import { Post } from "../types";
import { API_URL } from "../config";
import { jsonFetcher } from "../utils";

export function usePosts() {
  const { data, error, isLoading, mutate } = useSWR<Post[]>(
    `${API_URL}/posts`,
    jsonFetcher
  );

  return {
    posts: data,
    isLoading,
    isError: error,
    mutate,
  };
}
