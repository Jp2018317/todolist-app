export type User = {
    id: number;
    username: string;
    password: string;
    createdAt: string;
};

export type Task = {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: string;
};