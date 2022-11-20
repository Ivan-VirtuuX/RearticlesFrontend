import React from 'react';
import styles from './SideComments.module.scss';
import { CommentItem } from './CommentItem';
import clsx from 'clsx';
import { useComments } from '../../hooks/useComments';
import { SideCommentsSkeleton } from './SideCommentsSkeleton';

export const SideComments = ({ isLoading }) => {
  const { comments } = useComments();

  return (
    <div className={clsx(styles.root)}>
      <h3>Последние комментарии</h3>

      {isLoading && [...Array(5)].map((_, index) => <SideCommentsSkeleton key={index} />)}
      {comments &&
        comments?.slice(0, 5)?.map((obj) => <CommentItem key={obj.commentId} {...obj} isLoading={isLoading} />)}
    </div>
  );
};
