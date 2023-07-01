import React from "react";
import { useParams } from "react-router";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Avatar, Chip } from "@mui/material";

import { useStreamer } from "../../hooks/streamer";
import styles from "./StreamerDetails.module.scss";
import { API_URL } from "../../config";

export function StreamerDetails() {
  const { id } = useParams();
  const { streamer, isLoading, isError, mutate } = useStreamer(Number(id));

  if (isLoading) return <div className={styles.container}>loading ...</div>;
  if (isError) return <div className={styles.container}>error</div>;

  const handleVote = (vote: "upvote" | "downvote") => {
    fetch(`${API_URL}/streamers/${id}/vote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vote: vote }),
    })
      .then(async (response) => {
        if (response.ok) {
          return;
        } else {
          let err: Error;
          try {
            err = Error(JSON.stringify(await response.json()));
          } catch {
            err = Error("Something went wrong");
          }
          throw err;
        }
      })
      .then((result) => {
        mutate();
      })
      .catch((err: Error) => alert(err.message));
  };
  return (
    <div className={styles.container}>
      {streamer && (
        <>
          <div className={styles.streamerInfo}>
            <Avatar
              alt={streamer.name}
              src={streamer.avatar}
              className={styles.avatar}
            />
            <dl className={styles.nameAndPlatform}>
              <dt>Name:</dt>
              <dd>{streamer.name}</dd>
              <dt>Platform:</dt>
              <dd>{streamer.platform}</dd>
            </dl>
            <div className={styles.votes}>
              <Chip
                icon={<ThumbUpIcon />}
                label={streamer.upvote}
                onClick={() => handleVote("upvote")}
              />
              <Chip
                icon={<ThumbDownIcon />}
                label={streamer.downvote}
                onClick={() => handleVote("downvote")}
              />
            </div>
          </div>
          <div className={styles.description}>
            <p>{streamer.description}</p>
          </div>
        </>
      )}
    </div>
  );
}
