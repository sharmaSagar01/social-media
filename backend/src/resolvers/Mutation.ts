import { GraphQLError } from "graphql";
import { Context } from "../types/Context";
import { UserInputError } from "apollo-server-express";
import { compareHash, hashData } from "../utils/utils";
import { validateRegisterInput, validateLoginInput } from "../utils/validators";
import { createAccessToken } from "../utils/utils";
export const Mutation = {
  register: async (
    _,
    data: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    { prisma }: Context
  ) => {
    // Validate User Input

    const { errors, valid } = validateRegisterInput(
      data.username,
      data.email,
      data.password,
      data.confirmPassword
    );

    console.log(valid);

    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }

    // Check if the username is already taken

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new UserInputError("Email is already taken", {
        errorCode: "EMAIL_ALREADY_TAKEN",
      });
    }

    // Hashing the password before saving it to the database

    data.password = await hashData(data.password);

    // Saving the user to the database

    const res = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        createdAt: new Date().toISOString(),
      },
    });

    return res;
  },
  login: async (
    _,
    { email, password }: { email: string; password: string },
    { prisma }: Context
  ) => {
    // Validate User Input

    const { errors, valid } = validateLoginInput(email, password);

    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      errors["general"] = "User not found";
      throw new UserInputError("Invalid Email or Password", {
        errorCode: "INVALID_CREDENTIALS",
      });
    }

    const passwordMatches = await compareHash(password, user.password);

    if (!passwordMatches) {
      errors["general"] = "Wrong credentials";
      throw new UserInputError("Invalid Email or Password", {
        errorCode: "INVALID_CREDENTIALS",
      });
    }

    return {
      accessToken: createAccessToken(user.id, user.email, user.password),
    };
  },
};
