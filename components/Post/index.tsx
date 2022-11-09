import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { Paper, Typography } from '@material-ui/core';
import styles from './Post.module.scss';
import { PostActions } from '../PostActions';
import { PostSkeleton } from './PostSkeleton';
import { useLoading } from '../../hooks/useLoading';

interface PostProps {
  title: string;
  postId: string;
  description: string;
  body?: any;
  width?: number;
}

export const Post: FC<PostProps> = ({ title, description, postId, body }) => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <PostSkeleton />}
      <Paper
        style={{ display: isLoading ? 'none' : '' }}
        elevation={0}
        className="p-20"
        classes={{ root: styles.paper }}
      >
        <Typography variant="h5" className={styles.title}>
          <Link href={`/news/${postId}`}>
            <a>{title}</a>
          </Link>
        </Typography>
        <Typography className="mt-10 mb-15">{description}</Typography>
        {body?.filter((obj) => obj.type === 'image')[0]?.data?.file?.url && (
          <img
            src={body?.filter((obj) => obj.type === 'image')[0]?.data?.file?.url}
            alt="post image"
            width={600}
            className={styles.postImg}
          />
        )}
        <div className={styles.postActions}>
          <PostActions postId={postId} />
        </div>
      </Paper>
    </>
  );
};
