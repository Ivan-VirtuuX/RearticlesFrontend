import React, { useEffect, useState } from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';
import styles from './SideComments.module.scss';
import { CommentItem } from './CommentItem';
import clsx from 'clsx';
import { useComments } from '../../hooks/useComments';
import { useMediaQuery } from '@material-ui/core';
import { SideCommentsSkeleton } from './SideCommentsSkeleton';

export const SideComments = ({ isLoading }) => {
  const { comments } = useComments();

  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const matches750 = useMediaQuery('(max-width:750px)');

  useEffect(() => {
    matches750 ? setVisible(true) : setVisible(false);
  }, [matches750]);

  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      {!matches750 ? (
        <h3 onClick={toggleVisible}>
          Последние комментарии <ArrowRightIcon />
        </h3>
      ) : (
        <h3>Последние комментарии</h3>
      )}
      {isLoading && [...Array(5)].map((_, index) => <SideCommentsSkeleton visible={visible} key={index} />)}
      {visible &&
        comments &&
        comments?.slice(0, 5)?.map((obj) => <CommentItem key={obj.commentId} {...obj} isLoading={isLoading} />)}
    </div>
  );
};
