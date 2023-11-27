import { generateToken } from '@helpers/authentication';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

const jwtPrivateKey = 'jwt@secrect';
const jwtExpiresIn = '30d';

describe('generateToken', () => {
  it('should generate a valid token with the provided id and email', () => {
    const id = '123';
    const email = 'test@example.com';

    jwt.sign.mockReturnValue('mockedToken');
    const token = generateToken(id, email);

    expect(token).toEqual('mockedToken');
    expect(jwt.sign).toHaveBeenCalledWith({ id, email }, jwtPrivateKey, { expiresIn: jwtExpiresIn });
  });
});
