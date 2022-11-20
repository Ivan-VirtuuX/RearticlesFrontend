import React, { FC, useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckOutlined';
import AddIcon from '@material-ui/icons/AddOutlined';
import { Api } from '../../utils/api';
import { ResponseUser } from '../../utils/api/types';

interface FollowStateProps {
  userId: string;
  authorId: string;
  followers?: ResponseUser[];
}

export const FollowState: FC<FollowStateProps> = ({ userId, authorId, followers }) => {
  const [followed, setFollowed] = useState(false);
  const [isFollowDisabled, setIsFollowDisabled] = useState(false);
  const [isUnfollowDisabled, setIsUnfollowDisabled] = useState(false);

  const onUnfollow = async () => {
    setIsUnfollowDisabled(true);
    await Api().user.unfollow(authorId, userId);
    setFollowed(false);
    setIsUnfollowDisabled(false);
    setIsFollowDisabled(false);
  };

  const onFollow = async () => {
    setIsFollowDisabled(true);
    await Api().user.addFollower(authorId, userId);
    setFollowed(true);
  };

  useEffect(() => {
    try {
      if (followers.some((follower) => follower.userId === authorId)) {
        setFollowed(true);
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return followed ? (
    <Button
      disabled={isUnfollowDisabled}
      onClick={onUnfollow}
      variant="contained"
      style={{ minWidth: 30, width: 35, height: 30 }}
    >
      <CheckIcon style={{ fontSize: 20, color: '#2ea83a' }} />
    </Button>
  ) : (
    <Button
      disabled={isFollowDisabled}
      onClick={onFollow}
      variant="contained"
      style={{ minWidth: 30, width: 35, height: 30 }}
    >
      <AddIcon />
    </Button>
  );
};
