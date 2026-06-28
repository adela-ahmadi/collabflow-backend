import AppError from "../../errors/AppError";

import User from "./user.model";

const getMe = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};

const uploadAvatar = async (userId: string, avatarUrl: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  user.avatar = avatarUrl;

  await user.save();

  return user;
};

export const UserServices = {
  getMe,
  uploadAvatar,
};
