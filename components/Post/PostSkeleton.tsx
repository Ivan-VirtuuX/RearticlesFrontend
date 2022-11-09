import React, { FC } from 'react';
import styles from './Post.module.scss';
import { Skeleton } from '@material-ui/lab';

export const PostSkeleton = () => {
  return (
    <div className={styles.skeleton} style={{ width: '100%' }}>
      <Skeleton variant="rect" width={'100%'} height={300} />
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonInfo}>
          <div className={styles.skeletonPostActions}>
            <Skeleton variant="circle" width={30} height={30} />
            <Skeleton variant="circle" width={30} height={30} />
            <Skeleton variant="circle" width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
};
