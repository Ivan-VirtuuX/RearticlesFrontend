import { Avatar, Button, Paper, Typography } from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { PostActions } from '../PostActions';
import UserAddIcon from '@material-ui/icons/PersonAddOutlined';
import styles from './FullPost.module.scss';
import { OutputData } from '@editorjs/editorjs';
import { ResponseUser } from '../../utils/api/types';
import { useRouter } from 'next/router';
import { Api } from '../../utils/api';
import { selectUserData } from '../../redux/slices/user';
import { useAppSelector } from '../../redux/hooks';
import { useLoading } from '../../hooks/useLoading';
import { FullPostSkeleton } from './FullPostSkeleton';

interface FullPostProps {
  title: string;
  blocks: OutputData['blocks'];
  authorId: string;
}

export const FullPost: FC<FullPostProps> = ({ title, blocks, authorId }) => {
  const [author, setAuthor] = useState<ResponseUser>();
  const [isFollow, setIsFollow] = useState(false);
  const [isFollowDisabled, setIsFollowDisabled] = useState(false);
  const [isUnfollowDisabled, setIsUnfollowDisabled] = useState(false);

  const userData = useAppSelector(selectUserData);
  const userId = userData?.id || userData?._id;

  const router = useRouter();
  const { id } = router.query;

  const { isLoading } = useLoading();

  useEffect(() => {
    (async () => {
      try {
        const data = await Api().user.getOne(authorId);

        setAuthor(data);

        if (data.followers.some((follower) => follower.userId === userId)) {
          setIsFollow(true);
        } else {
          setIsFollow(false);
        }
      } catch (err) {
        console.warn(err);
      } finally {
        setIsFollowDisabled(false);
      }
    })();
  }, [id]);

  const onFollow = async () => {
    setIsFollowDisabled(true);
    await Api().user.addFollower(userId, authorId);
    setIsFollow(true);
  };

  const onUnfollow = async () => {
    setIsUnfollowDisabled(true);
    await Api().user.unfollow(userId, authorId);
    setIsFollow(false);
    setIsUnfollowDisabled(false);
    setIsFollowDisabled(false);
  };

  return (
    <>
      {isLoading && <FullPostSkeleton />}
      <Paper elevation={0} className={styles.paper} style={{ display: isLoading ? 'none' : '' }}>
        <div className="container">
          <Typography variant="h4" className={styles.title}>
            {title}
          </Typography>
          <div className={styles.text}>
            {blocks.map((obj) => (
              <React.Fragment key={obj?.id}>
                <Typography dangerouslySetInnerHTML={{ __html: obj.data.text }} />
                {obj.data.file?.url && (
                  <img src={obj.data.file.url} alt="post image" width={'100%'} style={{ borderRadius: 8 }} />
                )}
              </React.Fragment>
            ))}
            <div className={styles.postActions}>
              <PostActions postId={id} />
            </div>
            <div className={`d-flex justify-between align-center mt-30 ${styles.userActions}`}>
              <div className={styles.userInfo}>
                <Avatar src={author?.avatarUrl} style={{ borderRadius: 50 }}></Avatar>
                <b>{author?.fullName}</b>
              </div>
              {(userData?._id || userData?.id) && (userData?._id || userData?.id) !== authorId && (
                <div>
                  {isFollow ? (
                    <Button disabled={isUnfollowDisabled} variant="contained" onClick={onUnfollow}>
                      <b>Отписаться</b>
                    </Button>
                  ) : (
                    <Button disabled={isFollowDisabled} variant="contained" onClick={onFollow}>
                      <UserAddIcon />
                      <b className="ml-10">Подписаться</b>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};
