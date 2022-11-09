import { AxiosInstance } from 'axios';

export const Cloudinary = (instance: AxiosInstance) => ({
  async changeImage(imageFormData) {
    const data = await instance.post('/upload', imageFormData);

    return data;
  },
});
