import { validatePassword, validateEmail } from '.';
import { User } from '../models';

export default class AuthModule {
  static validateName(name) {
    console.log('validateName');
    if(name.length < 3) {
      return false;
    }
    return true;
  }

  static signup(name = null, email, password, passwordConfirmation) {
    if(!this.validateName(name)) {
      throw new Error('Name is invalid');
    }
    
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
  }
}
