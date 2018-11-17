import { expect } from 'chai';
import Chance from 'chance';

import { signup } from '../../auth';

import { User } from '../../models';

const chance = new Chance();

describe('Integration -> Signup', function() {
    beforeEach(function() {
      //create db
    });

    afterEach(function() {
      //drop db
    });

    it.only('should save user with correct paramsin db', function(done) {
      const name = chance.name();
      const email = chance.email();
      const word = chance.word({length: 10});
      signup(name, email, word, word)
        .then(() => User.findOne({ where: { email } }))
        .then(res => {
          expect(res.name).to.be.equal(name);
          expect(res.email).to.be.equal(email);
          done();
        })
    });
});