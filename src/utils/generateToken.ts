import jwt, { Secret, SignOptions } from "jsonwebtoken";

const generateToken = (
  payload: {
    userId: string;
    email: string;
    role: string;
  },
  secret: Secret,
  expiresIn: SignOptions["expiresIn"]
) => {
  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(payload, secret, options);
};

export default generateToken;
