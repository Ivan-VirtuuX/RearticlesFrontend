import React, { useState } from 'react';
import { Typography, Avatar } from '@material-ui/core';
import styles from './Comment.module.scss';
import { ResponseUser } from '../../utils/api/types';
import { Api } from '../../utils/api';
import Link from 'next/link';

interface CommentPostProps {
  commentId: string;
  author: ResponseUser;
  text: string;
  createdAt: string;
  postId: string;
  currentUserId: string;
  onRemove: (commentId: string) => void;
}

export const Comment: React.FC<CommentPostProps> = ({
  text,
  createdAt,
  onRemove,
  commentId,
  author,
  currentUserId,
  postId,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickRemove = async () => {
    if (window.confirm('Подтвердите удаление')) {
      try {
        await Api().comment.remove(commentId, postId);

        onRemove(commentId);
      } catch (err) {
        console.warn(err);
        alert('Не удалось удалить комментарий');
      } finally {
        handleClose();
      }
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <Avatar src={author?.avatarUrl} style={{ width: 38, height: 38 }} />
        <Link href={`/profile/${author.userId}`}>
          <a>
            <b>{author?.fullName}</b>
          </a>
        </Link>
        <span>{createdAt.slice(0, -14)}</span>
      </div>
      <Typography className={styles.text}>{text}</Typography>
      {author?.userId === currentUserId && (
        <>
          <span className={styles.replyBtn} onClick={handleClickRemove}>
            Удалить
          </span>
        </>
      )}
    </div>
  );
};
