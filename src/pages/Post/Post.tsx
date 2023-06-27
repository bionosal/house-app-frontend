import React, { useEffect, useRef } from "react";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { KeyedMutator } from "swr";

import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import { usePosts } from "../../hooks";
import styles from "./Post.module.scss";
import { Post } from "../../types";

type AddPostProps = {
  author: string;
  content: string;
  title: string;
};
export function Posts() {
  const { posts = [], isLoading, isError, mutate } = usePosts();
  const postListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = postListRef.current;
    if (container) {
      container.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }
  }, [posts]);

  if (isLoading) return <div>ładowanie</div>;
  if (isError) return <div>error</div>;

  const handleSubmit = (data: AddPostProps) => {
    fetch("http://localhost:8000/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Coś poszło nie tak");
        }
      })
      .then((result) => {
        mutate();
      })
      .catch((err: Error) => alert(err.message));
  };
  return (
    <div className={styles.container}>
      <div className={styles.postList} ref={postListRef}>
        {posts.map((post) => (
          <PostList post={post} mutate={mutate} />
        ))}
      </div>
      <div className={styles.postAdd}>
        <FormContainer onSuccess={handleSubmit}>
          <div className={styles.postAddInfo}>
            <TextFieldElement
              name="title"
              label="Tytuł"
              required
              variant="standard"
            />
            <TextFieldElement
              name="author"
              label="Autor"
              required
              variant="standard"
            />
          </div>
          <TextFieldElement
            name="content"
            label="Treść"
            required
            variant="standard"
            fullWidth
            multiline
          />
          <div className={styles.postAddSubmit}>
            <IconButton type="submit">
              <SendIcon />
            </IconButton>
          </div>
        </FormContainer>
      </div>
    </div>
  );
}

type PostListProps = {
  post: Post;
  mutate: KeyedMutator<Post[]>;
};

function PostList({ post, mutate }: PostListProps) {
  const handleDelete = () => {
    fetch(`http://localhost:8000/posts/${post.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          mutate();
        } else {
          throw Error("Coś poszło nie tak");
        }
      })
      .catch((err: Error) => alert(err.message));
  };
  return (
    <div className={styles.postDiv}>
      <div>
        <div className={styles.postInfo}>
          <div>{post.author}</div>
          <div>{post.created_on.slice(0, 19).replace("T", " ")}</div>
        </div>
        <div className={styles.postContent}>
          <h3>{post.title}</h3>

          {post.content}
        </div>
      </div>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
}
