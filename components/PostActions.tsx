import React, { CSSProperties, useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import {
  ModeCommentOutlined as CommentsIcon,
  BookmarkBorderOutlined as FavoriteIcon,
  ShareOutlined as ShareIcon,
  Bookmark as BookmarkIcon,
} from '@material-ui/icons';
import { useComments } from '../hooks/useComments';
import { Api } from '../utils/api';
import { useAppSelector } from '../redux/hooks';
import { selectUserData } from '../redux/slices/user';
import { SharePost } from './SharePost';

const styles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  top: '5',
  listStyle: 'none',
  padding: '0',
  margin: '0',
};

interface PostActionsProps {
  postId: any;
}

export const PostActions: React.FC<PostActionsProps> = ({ postId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShareVisible, setIsShareVisible] = useState(false);

  const openShareDialog = () => {
    setIsShareVisible(true);
  };

  const closeShareDialog = () => {
    setIsShareVisible(false);
  };

  const userData = useAppSelector(selectUserData);

  const { comments } = useComments(postId);

  const onAddFavorite = async () => {
    try {
      setIsFavorite(true);
      await Api().user.addFavorite(postId, userData?.id || userData?._id);
      console.log(userData?.id, userData?._id);
    } catch (err) {
      console.log(userData?.id, userData?._id);
      console.warn(err);
    }
  };

  const onRemoveFavorite = async () => {
    try {
      setIsFavorite(false);
      await Api().user.removeFavorite(postId, userData?.id || userData?._id);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const user = await Api().user.getOne(userData?.id || userData?._id);

        if (user.favorites.some((favorite) => favorite.postId === postId)) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (err) {
        console.warn(err);
      }
    })();
  }, []);

  return (
    <ul style={styles}>
      <li style={{ fontSize: 18, color: '#6e6d6b' }}>
        <IconButton style={{ pointerEvents: 'none' }}>
          <CommentsIcon />
        </IconButton>
        {comments.length}
      </li>
      {userData && (
        <li>
          {isFavorite ? (
            <IconButton onClick={onRemoveFavorite}>
              <BookmarkIcon />
            </IconButton>
          ) : (
            <IconButton onClick={onAddFavorite}>
              <FavoriteIcon />
            </IconButton>
          )}
        </li>
      )}
      <li>
        <IconButton onClick={openShareDialog}>
          <ShareIcon />
        </IconButton>
      </li>
      <SharePost
        postUrl={`https://rearticles.vercel.app/news/${postId}`}
        onClose={closeShareDialog}
        visible={isShareVisible}
      />
    </ul>
  );
};
