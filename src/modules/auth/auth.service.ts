import bcrypt from "bcrypt";
import User from "../user/user.model";
import { IUser } from "../user/user.interface";

const registerUser = async (payload: IUser) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  payload.password = hashedPassword;

  const user = await User.create(payload);

  const userObject = user.toObject();

  const { password, ...remainingUserData } = userObject;

  return remainingUserData;
};

export const AuthServices = {
  registerUser,
};
