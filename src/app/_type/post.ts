export interface Post {
  id: string;
  title: string;
  content: string; //ブログ内容
  createdAt: string; //日付
  categories: { id: string; name: string }[];
  thumbnail: { url: string; height: number; width: number };
}
