import React, { FC, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogContentText, Typography } from '@material-ui/core';
import styles from './SharePost.module.scss';

interface SharePostProps {
  onClose: () => void;
  visible: boolean;
  postUrl: string;
}

export const SharePost: FC<SharePostProps> = ({ onClose, visible, postUrl }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyTextRef = useRef(null);

  const onClickInput = (e: any) => {
    e.target.select();

    navigator.clipboard.writeText(postUrl);
    copyTextRef?.current?.animate(opacityUp, timing);

    setIsCopied(true);
  };

  const opacityUp = [
    {
      opacity: 0,
      transition: 'all 0.5s ease-in-out',
    },
    {
      opacity: 1,
      transition: 'all 0.5s ease-in-out',
    },
  ];

  const timing = {
    duration: 200,
    iterations: 1,
  };

  return (
    <Dialog open={visible} onClose={onClose} fullWidth maxWidth="sm" style={{ zIndex: 10000 }}>
      <DialogContent className={styles.dialogContainer}>
        <DialogContentText className="d-flex align-center justify-center flex-column">
          <div className={styles.title}>
            <Typography variant="h4">Поделиться статьей</Typography>
          </div>
          <div className={`d-flex align-center justify-center ${styles.urlContainer}`}>
            <input type="text" className={styles.url} readOnly value={postUrl} onClick={onClickInput} />
          </div>
          <p ref={copyTextRef} style={{ position: 'absolute', bottom: 0, opacity: isCopied ? 1 : 0 }}>
            Скопировано
          </p>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};
