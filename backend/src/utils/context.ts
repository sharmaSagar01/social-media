import { PrismaClient } from "@prisma/client";
import { Context } from "../types/Context";

const prisma = new PrismaClient();

const createContext = async ({ req }): Promise<Context> => {
  return { prisma };
};

export default createContext;
