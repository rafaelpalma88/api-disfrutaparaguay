export interface IPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
    // role: "MEMBER" | "ADMIN" | "NOT_APPROVED";
    role: string;
  };
  publishedAt: Date;
  comments: IComment[];
  // onSubmitComment: (comment: string, postId: string) => void;
}

export interface IComment {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
    // role: "MEMBER" | "ADMIN" | "NOT_APPROVED";
    role: string;
  };
  publishedAt: Date;
  content: string;
}

export const postsMock: IPost[] = [
  {
    id: "1",
    title: "Titulo Exemplo 1",
    content: "Content Example 1",
    publishedAt: new Date("2022-05-03 20:00:00"),
    author: {
      id: "123456",
      avatarUrl: "https://avatars.githubusercontent.com/u/23245187?v=4",
      name: "Rafael Costa Palma",
      role: "ADMIN",
    },
    comments: [
      {
        id: "1",
        author: {
          id: "123456",
          avatarUrl: "https://avatars.githubusercontent.com/u/23245187?v=4",
          name: "Rafael Costa Palma",
          role: "ADMIN",
        },
        publishedAt: new Date("2022-05-03 20:00:00"),
        content: "Example Comment 1",
      },
      {
        id: "2",
        author: {
          id: "123456",
          avatarUrl: "https://avatars.githubusercontent.com/u/23245187?v=4",
          name: "Rafael Costa Palma",
          role: "ADMIN",
        },
        publishedAt: new Date("2022-05-03 20:00:00"),
        content: "Example Comment 2",
      },
    ],
  },
];
