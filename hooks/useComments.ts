import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Api } from '../utils/api';
import { CommentItem } from '../utils/api/types';

type UseCommentsProps = {
  setComments: Dispatch<SetStateAction<CommentItem[]>>;
  comments: CommentItem[];
};

export const useComments = (postId?: string | string[]): UseCommentsProps => {
  const [comments, setComments] = useState<CommentItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        if (postId) {
          const arr = await Api().comment.getAll(postId);

          setComments(arr);
        } else {
          const arr = await Api().comment.getAll();

          setComments(arr);
        }
      } catch (err) {
        console.warn(err);
      }
    })();
  }, [postId]);

  return { comments, setComments };
};
