import { MainLayout } from '../../layouts/MainLayout';
import { FullPost } from '../../components/FullPost';
import React from 'react';
import { PostComments } from '../../components/PostComments';
import { GetServerSideProps, NextPage } from 'next';
import { PostItem } from '../../utils/api/types';
import { Api } from '../../utils/api';

interface FullPostPageProps {
  post: PostItem;
}

const FullPostPage: NextPage<FullPostPageProps> = ({ post }) => {
  return (
    <MainLayout className="mb-50" contentFullWidth hideComments>
      <FullPost title={post.title} blocks={post.body} authorId={post.userId} />
      <PostComments postId={post.postId} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const postId = ctx.params.id;

    const post = await Api(ctx).post.getOne(postId);

    return {
      props: { post },
    };
  } catch (err) {
    console.warn('Full post error', err);

    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default FullPostPage;
