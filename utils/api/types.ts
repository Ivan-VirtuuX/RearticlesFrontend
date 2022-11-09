import { OutputData } from '@editorjs/editorjs';
export type LoginDto = {
  email: string;
  password: string;
};

export type SearchPostDto = {
  title?: string;
  body?: string;
  views?: 'DESC' | 'ASC';
  limit?: number;
  take?: number;
  tag?: string;
};

export type CreateUserDto = {
  fullName: string;
} & LoginDto;

export type CreatePostDto = {
  title: string;
  body: OutputData['blocks'];
};

export type CreateCommentDto = {
  postId?: string;
  author: ResponseUser;
  text: string;
};

export type ResponseUser = {
  id?: string;
  _id?: string;
  userId: string;
  avatarUrl: string;
  fullName: string;
  favorites: PostItem[];
  email: string;
  token?: string;
  followers?: ResponseUser[];
  createdAt?: string;
  updatedAt?: string;
};

export type PostItem = {
  postId: string;
  title: string;
  body: OutputData['blocks'];
  description: string;
  comments: CommentItem;
  userId: string;
  views: number;
  tags: null | string;
  createdAt: string;
};

export type CommentItem = {
  commentId: string;
  text: string;
  author: ResponseUser;
  createdAt: string;
};
