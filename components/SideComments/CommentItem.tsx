import React from 'react';
import styles from './SideComments.module.scss';
import Link from 'next/link';
import { ResponseUser } from '../../utils/api/types';
import { usePosts } from '../../hooks/usePosts';
import Avatar from '@material-ui/core/Avatar';

interface CommentItemProps {
  text: string;
  author: ResponseUser;
  postId?: string;
  isLoading: boolean;
}

export const CommentItem: React.FC<CommentItemProps> = ({ text, author, postId, isLoading }) => {
  const { posts } = usePosts(postId);

  return (
    <>
      <div className={styles.commentItem} style={{ display: isLoading ? 'none' : '' }}>
        <div className={styles.userInfo}>
          <Avatar src={author?.avatarUrl} className={styles.avatar} />
          <Link href={`/profile/${author?.userId}`}>
            <a>
              <b>{author?.fullName}</b>
            </a>
          </Link>
        </div>
        <p className={styles.text}>{text}</p>
        <Link href={`/news/${postId}`}>
          <a>
            <span className={styles.postTitle}>{posts.find((post) => post.postId === postId)?.title}</span>
          </a>
        </Link>
      </div>
    </>
  );
};
