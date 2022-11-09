import React from 'react';
import styles from './SideComments.module.scss';
import { Skeleton } from '@material-ui/lab';

export const SideCommentsSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonUser}>
          <Skeleton variant="circle" width={30} height={30} />
          <Skeleton variant="text" width={55} height={20} style={{ marginLeft: 15 }} />
        </div>
        <div className={styles.skeletonInfo}>
          <Skeleton variant="text" width={280} height={15} />
          <Skeleton variant="text" width={280} height={15} />
        </div>
      </div>
    </div>
  );
};
