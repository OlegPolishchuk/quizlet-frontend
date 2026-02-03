import axios from 'axios';

import { BASE_URL } from '@/constants/constants.ts';

export const api = axios.create({
  baseURL: BASE_URL,
});

// Перехватчик: перед каждым запросом вставляет актуальный токен
api.interceptors.request.use(async config => {
  // Мы обращаемся к глобальному объекту Clerk, так как это работает вне React-компонентов
  const token = await window.Clerk?.session?.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
