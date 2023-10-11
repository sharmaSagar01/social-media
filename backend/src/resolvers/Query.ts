import { GraphQLError } from "graphql";
import { Context } from "../types/Context";

export const Query = {
  getPosts: async (_, __, { prisma }: Context) => {
    const posts = await prisma.post.findMany();
    return posts;
  },
};
