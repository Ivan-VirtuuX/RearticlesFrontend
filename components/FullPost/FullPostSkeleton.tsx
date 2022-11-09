import React from 'react';
import styles from './FullPost.module.scss';
import { Skeleton } from '@material-ui/lab';

export const FullPostSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Skeleton
        variant="rect"
        width={940}
        height={300}
        style={{ margin: '0 auto', borderRadius: 8, marginTop: 20 }}
        className={styles.skeletonImg}
      />
      <div className={styles.skeletonPostText}>
        <Skeleton variant="text" width={150} height={40} />
        <Skeleton variant="text" width={400} height={20} />
        <Skeleton variant="text" width={300} height={20} />
        <Skeleton variant="text" width={250} height={20} />
      </div>

      <div className={styles.skeletonPostActions}>
        <Skeleton variant="circle" width={30} height={30} style={{ borderRadius: 50 }} />
        <Skeleton variant="circle" width={30} height={30} style={{ borderRadius: 50 }} />
        <Skeleton variant="circle" width={30} height={30} style={{ borderRadius: 50 }} />
      </div>
      <div className="d-flex align-center mt-30">
        <Skeleton variant="circle" width={40} height={40} style={{ borderRadius: 50 }} />
        <Skeleton variant="text" width={60} height={30} style={{ marginLeft: 10 }} />
      </div>
      <div className="d-flex align-center mt-50" style={{ width: '100%' }}>
        <Skeleton variant="text" width={154} height={20} />
        <Skeleton variant="text" width={50} height={20} style={{ marginLeft: 15 }} />
      </div>
      <Skeleton
        variant="text"
        width={680}
        height={80}
        style={{ borderRadius: 8 }}
        className={styles.skeletonCommentInput}
      />
      <div>
        <div className="d-flex align-center mt-15">
          <Skeleton variant="circle" width={40} height={40} style={{ borderRadius: 50 }} />
          <Skeleton variant="text" width={100} height={30} style={{ marginLeft: 10 }} />
        </div>
        <div>
          <Skeleton variant="text" width={250} height={30} />
          <Skeleton variant="text" width={55} height={30} />
        </div>
      </div>
    </div>
  );
};
