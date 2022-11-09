import { NextPage } from 'next';
import React from 'react';
import { WriteForm } from '../../components/WriteForm';
import { MainLayout } from '../../layouts/MainLayout';
import { PostItem } from '../../utils/api/types';

interface WritePageProps {
  post: PostItem;
}

const WritePage: NextPage<WritePageProps> = () => {
  return (
    <MainLayout className="main-layout-white" hideComments hideMenu>
      <WriteForm />
    </MainLayout>
  );
};

export default WritePage;
