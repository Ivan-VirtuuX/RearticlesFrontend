import { NextPage } from 'next';
import { Post } from '../components/Post';
import { MainLayout } from '../layouts/MainLayout';
import { Api } from '../utils/api';
import { PostItem } from '../utils/api/types';

interface HomeProps {
  posts: PostItem[];
}

const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <MainLayout>
      {posts?.map((obj: any) => (
        <Post key={obj.postId} postId={obj.postId} title={obj.title} description={obj.description} body={obj.body} />
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

export default Home;
