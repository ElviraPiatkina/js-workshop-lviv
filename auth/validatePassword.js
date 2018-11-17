const validatePassword = password => {
  if (typeof password !== 'string') {
    return false;
  }

  if (password.length < 8) {
    return false;
  }

  return true;
};

export default validatePassword;