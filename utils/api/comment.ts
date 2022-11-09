import { AxiosInstance } from 'axios';
import { CreateCommentDto, CommentItem } from './types';

export const CommentApi = (instance: AxiosInstance) => ({
  async getAll(postId?: string | string[]) {
    if (postId) {
      const { data } = await instance.get<CommentItem[]>(`/posts/${postId}/comments`);

      return data;
    } else {
      const { data } = await instance.get<CommentItem[]>(`/posts/comments`);

      return data;
    }
  },

  async create(dto: CreateCommentDto, postId: string) {
    const { data } = await instance.post(`/posts/${postId}/comments`, dto);

    return data;
  },

  async remove(commentId: string, postId: string) {
    const { data } = await instance.delete(`/posts/${postId}/comments`, { data: { commentId: commentId } });

    return data;
  },
});
