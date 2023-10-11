import * as Scaler from "./Scaler";
import { Query } from "./Query";
import { Mutation } from "./Mutation";

const resolvers = {
  ...Scaler,
  Query,
  Mutation,
};

export default resolvers;
