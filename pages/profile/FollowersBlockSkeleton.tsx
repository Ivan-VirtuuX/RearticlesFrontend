import React from 'react';
import styles from './profile.module.scss';
import { Skeleton } from '@material-ui/lab';

const FollowersBlockSkeleton = () => {
  return (
    <div className={styles.followsBlockSkeleton}>
      <div className={styles.followsBlockSkeletonContent}>
        <Skeleton variant="text" width={82} height={21} />
        <Skeleton variant="circle" width={45} height={45} style={{ marginTop: 15 }} />
      </div>
    </div>
  );
};

export default FollowersBlockSkeleton;
