const validateGithubEmail = (email, cb) => {
  setTimeout(function(){
    if(email.length > 15) {
      return cb('some error');
    }
    cb(null, true);
  },1000);
};

export default validateGithubEmail;