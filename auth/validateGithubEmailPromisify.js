const validateGithubEmailPromisify = email => {
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      if(email.length > 15) {
        return reject('some error');
      }
      resolve(true);
    },1000);
  });
};

export default validateGithubEmailPromisify;