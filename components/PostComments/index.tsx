import { Paper, Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { CommentItem } from '../../utils/api/types';
import { AddCommentForm } from '../AddCommentForm';
import { Comment } from '../Comment';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { useComments } from '../../hooks/useComments';
import { useLoading } from '../../hooks/useLoading';

interface PostCommentsProps {
  postId: string;
}

export const PostComments: FC<PostCommentsProps> = ({ postId }) => {
  const userData = useAppSelector(selectUserData);

  const { comments, setComments } = useComments(postId);

  const { isLoading } = useLoading();

  const onAddComment = (obj: CommentItem) => {
    setComments((prev) => [...prev, obj]);
  };

  const onRemoveComment = (commentId: string) => {
    setComments((prev) => prev.filter((obj) => obj.commentId !== commentId));
  };

  return (
    <Paper elevation={0} className="mt40 p-30" style={{ display: isLoading ? 'none' : '' }}>
      <div className="container">
        {comments.length !== 0 && (
          <Typography variant="h6" className="mb-20">
            Комментариев: {comments.length}
          </Typography>
        )}
        {userData && <AddCommentForm onSuccessAdd={onAddComment} postId={postId} />}
        <div className="mb-20" />
        {comments?.map((obj) => (
          <Comment
            {...obj}
            commentId={obj.commentId}
            key={obj.commentId}
            onRemove={onRemoveComment}
            currentUserId={userData?.id || userData?._id}
            postId={postId}
          />
        ))}
      </div>
    </Paper>
  );
};
