import React from 'react';
import styles from './profile.module.scss';
import { Skeleton } from '@material-ui/lab';
import { useMediaQuery } from '@material-ui/core';

const ProfileSkeleton = () => {
  const matches427 = useMediaQuery('(max-width:427px)');

  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonContent}>
        <div>
          <div className={styles.skeletonUser}>
            <Skeleton variant="rect" width={120} height={120} style={{ borderRadius: 8 }} />
          </div>
          <div className={styles.skeletonInfo}>
            <Skeleton variant="text" width={120} height={30} style={{ marginTop: 10 }} />
            <Skeleton
              variant="rect"
              width={45}
              height={42}
              style={{ borderRadius: 8, display: matches427 ? 'block' : 'none', marginBottom: 20, marginTop: 10 }}
            />
            <Skeleton variant="text" width={180} height={20} />
          </div>
          <div className={styles.skeletonTabs}>
            <Skeleton variant="text" width={140} height={48} />
            <Skeleton variant="text" width={140} height={48} />
            <Skeleton variant="text" width={140} height={48} />
          </div>
        </div>
        <Skeleton variant="rect" width={45} height={42} style={{ borderRadius: 8 }} />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
