import { expect } from 'chai';
import Chance from 'chance';

import validatePassword from '../auth/validatePassword';
import validateEmail from '../auth/validateEmail';
import validateGithubEmail from '../auth/validateGithubEmail';
import validateGithubEmailPromisify from '../auth/validateGithubEmailPromisify';

import { doesNotReject } from 'assert';

const chance = new Chance();

describe('Auth module', function() {
  describe('validators', function() {
    it('should not password be less 8', function() {
      const testPassword = chance.word({ length: 5 })
      const isValid = validatePassword(testPassword);
      expect(isValid).to.equal(false);
    });
    it('should password be a string', function() {
      const isValid = validatePassword([1,2,3,4,5]);
      expect(isValid).to.equal(false);
    });
    it('should password be valid if password >= 8', function() {
      const testPassword = chance.word({ length: 10 })
      const isValid = validatePassword(testPassword);
      expect(isValid).to.equal(true);
    });
    it('should email be valid with correct email patternt', function() {
      const testEmail = 'john.doe@gmail.com';
      const isValid = validateEmail(testEmail);
      expect(isValid).to.equal(true);
    });
    it('should email be valid with correct email patternt', function() {
      const testEmail = 'john.doegmail.com';
      const isValid = validateEmail(testEmail);
      expect(isValid).to.equal(false);
    });

    it('should email be exist on github', function(done) {
      const testEmail = 'jo@gmail.com';
      validateGithubEmail(testEmail, (err, res) => {
        expect(res).to.equal(true);
        done();
      });
    });

    it('should not email be exist on github', function(done) {
      const testEmail = 'jo123456789012345@gmail.com';
      validateGithubEmail(testEmail, (err, res) => {
        expect(err).to.equal('some error');
        done();
      });
    });

    it('should email be exist on github (promisify)', function(done) {
      const testEmail = 'jo@gmail.com';
      validateGithubEmailPromisify(testEmail)
        .then(res  => {
          expect(res).to.equal(true);
          done();
        });
    });

    it('should email not be exist on github (promisify)', function(done) {
      const testEmail = 'jo123456789012345@gmail.com';
      validateGithubEmailPromisify(testEmail)
        .catch(err => {
          expect(err).to.equal('some error');
          done();
        });
    });

    // it.skip('should email be exist on github (async)', async function() {
    //   const testEmail = 'jo@gmail.com';
    //   const res = await validateGithubEmailPromisify(testEmail); 
    //   expect(res).to.equal(true);
    // });

  });
});