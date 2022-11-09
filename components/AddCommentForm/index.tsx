import { Input } from '@material-ui/core';
import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './AddCommentForm.module.scss';
import Button from '@material-ui/core/Button';
import { Api } from '../../utils/api';
import { CommentItem, ResponseUser } from '../../utils/api/types';
import { useComponentVisible } from '../../hooks/useComponentVisible';

interface AddCommentFormProps {
  postId: string;
  onSuccessAdd: (obj: CommentItem) => void;
}

export const AddCommentForm: FC<AddCommentFormProps> = ({ postId, onSuccessAdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [user, setUser] = useState<ResponseUser>();

  const btnRef = useRef(null);

  const { ref, setIsComponentVisible, isComponentVisible, setClicked } = useComponentVisible(false, btnRef);

  useEffect(() => {
    (async () => {
      const data = await Api().user.getMe();
      setUser(data);
    })();
  }, []);

  const onAddComment = async () => {
    try {
      setIsLoading(true);

      const comment = await Api().comment.create({ text: text, author: user }, postId);

      onSuccessAdd(comment);
      setIsComponentVisible(false);

      setTimeout(() => {
        setClicked(true);
      }, 2500);

      setText('');
    } catch (err) {
      console.warn(err);
      alert('Не удалось отправить комментарий');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.form}>
      <Input
        ref={ref}
        disabled={isLoading}
        onChange={(e) => setText(e.target.value)}
        value={text}
        onFocus={() => setClicked(true)}
        minRows={isComponentVisible ? 5 : 1}
        classes={{ root: styles.fieldRoot }}
        placeholder="Написать комментарий..."
        fullWidth
        multiline
      />
      {isComponentVisible && (
        <Button
          ref={btnRef}
          disabled={isLoading}
          onClick={onAddComment}
          className={styles.addButton}
          variant="contained"
          color="primary"
        >
          Опубликовать
        </Button>
      )}
    </div>
  );
};
