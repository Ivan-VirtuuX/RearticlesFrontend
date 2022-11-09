import React, { useState } from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';
import styles from './SideComments.module.scss';
import { CommentItem } from './CommentItem';
import clsx from 'clsx';
import { useComments } from '../../hooks/useComments';
import { useMediaQuery } from '@material-ui/core';

export const SideComments = () => {
  const { comments } = useComments();
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const matches700 = useMediaQuery('(max-width:700px)');

  return (
    <div className={clsx(styles.root, !visible && styles.rotated)}>
      {!matches700 ? (
        <h3 onClick={toggleVisible}>
          Последние комментарии <ArrowRightIcon />
        </h3>
      ) : (
        <h3>Последние комментарии</h3>
      )}
      {visible && comments && comments?.slice(0, 5)?.map((obj) => <CommentItem key={obj.commentId} {...obj} />)}
    </div>
  );
};
