import { HTTP, RESPONSE } from '@constants/enums';
import createError from '@helpers/createError';
import config from '@config/index';
import jwt from 'jsonwebtoken';

import User from '../db/models/user';

const {
  secrets: { jwtSecret, jwtExpiresIn },
} = config();

const jwtPrivateKey = process.env.NODE_ENV !== 'test' ? jwtSecret : 'jwt@secrect';

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1] || req.body.token || req.query.token;

    const message = 'Unauthorized';
    if (!token) {
      return next(
        createError(HTTP.UNAUTHORIZED, {
          status: RESPONSE.ERROR,
          message,
          data: null,
        })
      );
    }
    const decoded = jwt.verify(token, jwtPrivateKey);
    const curUser = await User.findOne({ email: decoded.email });
    req.user = { id: curUser?._id, email: curUser.email };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: 401,
      error: 'authentication failed, please login again',
    });
  }
};

export const generateToken = (id, email) => {
  const token = jwt.sign(
    {
      id,
      email,
    },
    jwtPrivateKey,
    {
      expiresIn: jwtExpiresIn || 30,
    }
  );

  return token;
};
