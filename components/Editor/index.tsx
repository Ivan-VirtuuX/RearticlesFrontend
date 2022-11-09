import React, { FC, useEffect } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import ImageTool from '@editorjs/image';
import { CloudinaryApi } from '../../utils/api/CloudinaryApi';
import styles from './Editor.module.scss';

interface EditorProps {
  onChange: (blocks: OutputData['blocks']) => void;
  initialBlocks?: OutputData['blocks'];
}

export const Editor: FC<EditorProps> = ({ onChange, initialBlocks }) => {
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editor',
      data: {
        blocks: initialBlocks,
      },
      placeholder: 'Введите текст статьи',
      async onChange() {
        const { blocks } = await editor.save();

        onChange(blocks);
      },
      tools: {
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: 'https://api.cloudinary.com/v1_1/virtuux/image/upload',
            },
            field: 'file',
            additionalRequestData: { upload_preset: 'cqxjdiz4' },
            captionPlaceholder: 'none',
            uploader: {
              /**
               * @param {File}
               * @return {Promise.<{success, file: {url}}>}
               */
              async uploadByFile(file) {
                const formData: any = new FormData();

                formData.append('file', file);
                formData.append('upload_preset', 'cqxjdiz4');

                const result = await CloudinaryApi().cloudinary.changeImage(formData);

                return {
                  success: 1,
                  file: {
                    url: result.data.secure_url,
                  },
                };
              },
            },
            buttonContent: 'Загрузить превью',
          },
        },
      },
    });

    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch((e) => console.error('Error editor cleanup', e));
    };
  }, []);

  return <div id="editor" className={styles.editor} />;
};
