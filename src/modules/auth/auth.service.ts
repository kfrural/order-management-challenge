import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../users/user.model';
import { env } from '../../config/env';

export async function register(email: string, password: string) {
  const hash = await bcrypt.hash(password, 10);
  return UserModel.create({ email, password: hash });
}

export async function login(email: string, password: string) {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  return jwt.sign(
    { sub: user._id.toString() },
    env.jwtSecret,
    { expiresIn: '1d' }
  );

}
