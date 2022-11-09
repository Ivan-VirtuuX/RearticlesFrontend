import React, { FC, useState } from 'react';
import { Button, Input } from '@material-ui/core';
import styles from './WriteForm.module.scss';
import dynamic from 'next/dynamic';
import { Api } from '../../utils/api';
import { PostItem } from '../../utils/api/types';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';

const Editor = dynamic(() => import('../Editor').then((m) => m.Editor), { ssr: false });

interface WriteFormProps {
  data?: PostItem;
}

export const WriteForm: FC<WriteFormProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(data?.title || '');
  const [blocks, setBlocks] = useState(data?.body || []);

  const { id } = useAppSelector(selectUserData);

  const onAddPost = async () => {
    try {
      setIsLoading(true);

      const obj = {
        title,
        body: blocks,
        id,
      };

      if (!data) {
        const post = await Api().post.create(obj);
        await router.push(`/news/${post.postId}`);
      } else {
        await Api().post.update(data.postId, obj);
      }
    } catch (err) {
      console.warn('Post create', err);
      alert('Post create error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff' }} className={styles.writeContainer}>
      <div>
        <Button
          disabled={isLoading || !blocks.length || !title}
          onClick={onAddPost}
          variant="contained"
          color="primary"
          style={{ marginBottom: 15, width: 180 }}
        >
          {data ? 'Сохранить' : 'Опубликовать'}
        </Button>
      </div>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        classes={{ root: styles.titleField }}
        placeholder="Заголовок"
      />
      <div className={styles.editor}>
        <Editor initialBlocks={data?.body} onChange={(arr) => setBlocks(arr)} />
      </div>
    </div>
  );
};
