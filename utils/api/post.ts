import { AxiosInstance } from 'axios';
import { CreatePostDto, PostItem, SearchPostDto } from './types';

export const PostApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<PostItem[]>('/posts');

    return data;
  },

  async search(title: string) {
    const { data } = await instance.post<PostItem[]>('/posts/search', { title: title });

    return data;
  },

  async getAllPostsComments() {
    const { data } = await instance.get('/posts/comments');

    return data;
  },

  async getOne(postId: string | string[]) {
    const { data } = await instance.get<PostItem>(`/posts/${postId}`);

    return data;
  },

  async create(dto: CreatePostDto) {
    const { data } = await instance.post<CreatePostDto, { data: PostItem }>('/posts', dto);

    return data;
  },

  async update(postId: string, dto: CreatePostDto) {
    const { data } = await instance.patch<CreatePostDto, { data: PostItem }>(`/posts/${postId}`, dto);

    return data;
  },
});
