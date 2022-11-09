import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Api } from '../utils/api';
import { PostItem } from '../utils/api/types';

type UsePostsProps = {
  setPosts: Dispatch<SetStateAction<PostItem[]>>;
  posts: PostItem[];
};

export const usePosts = (postId?: string): UsePostsProps => {
  const [posts, setPosts] = useState<PostItem[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const arr = await Api().post.getAll();
        setPosts(arr);
      } catch (err) {
        console.warn(err);
      }
    })();
  }, [postId]);

  return { posts, setPosts };
};
