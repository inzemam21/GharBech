import { Request } from "express";
import { IResolvers } from "apollo-server-express";
import { Database, User } from "../../../lib/types";
import { authorize } from "../../../lib/utils";
import {
  UserArgs,
  UserBookingsArgs,
  UserBookingsData,
  UserListingsArgs,
  UserListingsData
} from "./types";

export const userResolvers: IResolvers = {
  Query: {
    user: () => {
      return 'Query.user'
    }
    }
};
