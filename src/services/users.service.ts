import { User } from "@prisma/client";
import { db } from "../utils/db.server";
import bcrypt from "bcrypt";

export function findUserByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

export function createUserByEmailAndPassword(
  user: Pick<User, "email" | "password" | "firstName" | "lastName">
) {
  user.password = bcrypt.hashSync(user.password, 12);

  return db.user.create({ data: user });
}

export function findUserById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export function updateUserById(
  id: string,
  newUser: Pick<User, "firstName" | "lastName">
) {
  return db.user.update({
    where: {
      id,
    },
    data: {
      ...newUser,
    },
  });
}
