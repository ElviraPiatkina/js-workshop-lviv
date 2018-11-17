import rp from 'request-promise';

const validateGithubEmail = (email, cb) => {
  const options = {
    method: 'POST',
    uri: 'http://github/checkemail',
    body: {
      email
    },
    json: true
  };

  rp(options)
    .then((body) => {
      cb(null, true);
    })
    .catch((err) => {
      cb(err);
    });
};

export default validateGithubEmail;