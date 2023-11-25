import { model, Schema as _Schema } from 'mongoose';

const userSchema = _Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

export default User;
