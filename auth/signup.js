import { validatePassword, validateEmail } from '.';
import { User } from '../models';

const signup = (name = null, email, password, passwordConfirmation) => {
  if(!validateEmail(email)) {
    throw new Error('Email is invalid');
  }

  if(!validatePassword(password)) {
    throw new Error('Password is invalid');
  }

  if(password !== passwordConfirmation) {
    throw new Error('PasswordConfirmation is not equal to password');
  }

  if(password === email) {
    throw new Error('Password is equal to email');
  }

  return User.create({name, email, passwordDigest: () => password.reverse() });
};

export default signup;