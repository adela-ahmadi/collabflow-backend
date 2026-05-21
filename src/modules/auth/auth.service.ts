import bcrypt from "bcrypt";
import User from "../user/user.model";
import { IUser } from "../user/user.interface";
import AppError from "../../errors/AppError";
import generateToken from "../../utils/generateToken";
import config from "../../config";
import { SignOptions } from "jsonwebtoken";

//Register a new user
const registerUser = async (payload: IUser) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  payload.password = hashedPassword;

  const user = await User.create(payload);

  const userObject = user.toObject();

  const { password, ...remainingUserData } = userObject;

  return remainingUserData;
};

//Login user and generate access token
const loginUser = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({
    email: payload.email,
  }).select("+password");

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(401, "Invalid credentials");
  }

  const accessToken = generateToken(
    {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    config.jwt_access_secret as string,
    config.jwt_access_expires as SignOptions["expiresIn"]
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
