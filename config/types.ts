export type User = {
  id: number;
  username: string;
  password: string;
  createdAt: string;
};

export type Task = {
  id: number;
  title: string;
  status: "Complete" | "Incomplete";
  createdAt: string;
  updatedAt: string | null;
  author: string;
};