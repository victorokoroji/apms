export const queryKeys = {
  user: {
    all: (token: string) => ["user", token] as const,
  },
  posts: {
    all: ["posts"] as const,
    detail: (id: string) => [...queryKeys.posts.all, id] as const,
  },
};
