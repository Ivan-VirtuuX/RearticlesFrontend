import { NextPage } from 'next';
import React from 'react';
import { Post } from '../../components/Post';
import { MainLayout } from '../../layouts/MainLayout';
import { Api } from '../../utils/api';
import { PostItem } from '../../utils/api/types';

interface FavoritePageProps {
  posts: PostItem[];
}

const FavoritePage: NextPage<FavoritePageProps> = ({ posts }) => {
  return (
    <MainLayout>
      {posts?.map((obj: any) => (
        <Post key={obj.postId} title={obj.title} postId={obj.postId} description={obj.description} body={obj.body} />
      ))}
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  try {
    const posts = await Api().post.getAll();

    return {
      props: {
        posts,
      },
    };
  } catch (err) {
    console.warn(err);
  }

  return {
    props: {
      posts: null,
    },
  };
};

export default FavoritePage;
