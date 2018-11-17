import { validatePassword, validateEmail } from '.';

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
};

export default signup;