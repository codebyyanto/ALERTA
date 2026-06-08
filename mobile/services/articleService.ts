import api from './api';

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const articleService = {
  /**
   * Mengambil semua artikel, opsional berdasarkan status
   * GET /articles
   */
  async getArticles(status?: string): Promise<Article[]> {
    const { data } = await api.get<Article[]>('/articles', {
      params: status ? { status } : undefined,
    });
    return data;
  },

  /**
   * Mengambil satu artikel secara detail berdasarkan ID
   * GET /articles/:id
   */
  async getArticleById(id: string): Promise<Article> {
    const { data } = await api.get<Article>(`/articles/${id}`);
    return data;
  },
};
