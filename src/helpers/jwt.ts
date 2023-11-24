import config from "@config";
import jwt from "jsonwebtoken";

export const jwtVerify: (token: string) => string | object = (
  token: string
) => {
  try {
    return jwt.verify(token, config().secrets.jwtSecret);
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const jwtDecode: (string) => string | object | null = (
  token: string
) => {
  try {
    return jwt.decode(token);
  } catch (err) {
    console.log(err);
    return {};
  }
};
