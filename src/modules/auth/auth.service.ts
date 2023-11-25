import User from '../../db/models/user';

import { generateToken } from '@helpers/authentication';
import { AuthInterface } from './auth.interface';
import { hashPassword, comparePassword } from '@helpers/password';

export const createUser = async (data: AuthInterface) => {
  try {
    const existingEntity = await User.findOne({ email: data.email });
    if (existingEntity) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      email: data.email,
      password: hashPassword(data.password),
    };

    const userInstance = new User(newUser);

    const user = await userInstance.save();

    const token = generateToken(user._id, user.email);

    return {
      error: false,
      message: 'User registered successfully.',
      data: {
        id: user._id,
        email: user.email,
        token,
      } as any,
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: (err as any).message,
      data: null,
    };
  }
};

export const login = async (data: AuthInterface) => {
  try {
    const user = await User.findOne({ email: data.email });

    if (!user) {
      throw new Error('Invalid login credentials.');
    }

    const isCorrectPassword = comparePassword(user.password, data.password);

    if (!isCorrectPassword) {
      throw new Error('Invalid login credentials.');
    }

    const token = generateToken(user.id, user.email);

    await user.save();

    return {
      error: false,
      message: 'Login successful.',
      data: {
        id: user._id,
        email: user.email,
        token,
      } as any,
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: (err as any).message,
      data: null,
    };
  }
};
