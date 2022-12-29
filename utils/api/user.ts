import { AxiosInstance } from 'axios';
import { CreateUserDto, LoginDto, PostItem, ResponseUser } from './types';

export const UserApi = (instance: AxiosInstance) => ({
  async updateAvatar(userId: string | string[], avatarUrl: string) {
    const { data } = await instance.patch(`/users/${userId}`, { avatarUrl });
    return data;
  },

  async getAll() {
    const { data } = await instance.get<ResponseUser[]>('/users');
    return data;
  },

  async getFavorites(userId: string | string[]) {
    const { data } = await instance.get<PostItem[]>(`/users/${userId}/favorites`);

    return data;
  },

  async addFavorite(postId: string, userId: string | string[]) {
    const { data } = await instance.post(`/users/${userId}/favorites`, { postId: postId });

    return data;
  },

  async removeFavorite(postId: string, userId: string | string[]) {
    const { data } = await instance.delete(`/users/${userId}/favorites`, { data: { postId: postId } });

    return data;
  },

  async addFollower(followerId: string, userId: string | string[]) {
    const { data } = await instance.post(`/users/${userId}/followers`, { followerId: followerId });

    return data;
  },

  async unfollow(followerId: string, userId: string | string[]) {
    const { data } = await instance.delete(`/users/${userId}/followers`, { data: { followerId: followerId } });

    return data;
  },

  async getOne(userId: string | string[]) {
    const { data } = await instance.get<ResponseUser>(`/users/${userId}`);

    return data;
  },
  
  async register(dto: CreateUserDto) {
    const { data } = await instance.post<CreateUserDto, { data: ResponseUser }>('/auth/register', dto);
    return data;
  },

  async login(dto: LoginDto) {
    const { data } = await instance.post<LoginDto, { data: ResponseUser }>('/auth/login', dto);
    return data;
  },

  async getMe() {
    const { data } = await instance.get<ResponseUser>('/auth/me');
    return data;
  },
});
