import useSWR from "swr";

import { Streamer } from "../types";

const fetcherStreamers = (url: string): Promise<Streamer[]> =>
  fetch(url).then((res) => res.json());

const fetcherStreamer = (url: string): Promise<Streamer> =>
  fetch(url).then((res) => res.json());

export function useStreamers() {
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:8000/streamers`,
    fetcherStreamers
  );

  return {
    streamers: data,
    isLoading,
    isError: error,
    mutate,
  };
}

export function useStreamer(streamerId: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:8000/streamers/${streamerId}`,
    fetcherStreamer
  );

  return {
    streamer: data,
    isLoading,
    isError: error,
    mutate,
  };
}
