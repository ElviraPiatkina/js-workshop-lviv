import { expect } from 'chai';
import Chance from 'chance';

import sinon from 'sinon';

import nock from 'nock';

import {
  validatePassword,
  validateEmail,
  validateGithubEmail,
  validateGithubEmailPromisify,
  signup
} from '../auth';

import { User } from '../models';

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
      nock('http://github')
        .post('/checkemail')
        .reply(200, {
          status: true
        });
      validateGithubEmail(testEmail, (err, res) => {
        expect(res).to.equal(true);
        done();
      });
    });

    it('should not email be exist on github', function(done) {
      const testEmail = 'jo123456789012345@gmail.com';
      validateGithubEmail(testEmail, (err, res) => {
        // expect(err).to.equal('some error');
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
      const testEmail = 'jow3232323232323232@gmail.com';
      validateGithubEmailPromisify(testEmail)
        .then(() => {
          done();
        })
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

  describe('signup', function() {
    it('should throw an error if password !== confirmation', function() {
      const testSignup =  () => signup('john', 'john.doegmail.com', '12345678', '12345678');
      expect(testSignup).to.throw('Email is invalid');
    });

    // todo practice
    it('should throw an error if password is invalid');
    it('should throw an error if email is invalid');
    it('should throw an error if password is equal to email');

    it('should create user with correct params', function(done) {
      sinon.stub(User, "create").resolves({
        name: 'john', email: 'john.doe@gmail.com', passwordDigest: '12345678'
      });
      signup('john', 'john.doe@gmail.com', '12345678', '12345678')
        .then(res => {
          expect(res).to.be.deep.equal({
            name: 'john',
            email: 'john.doe@gmail.com',
            passwordDigest: '12345678'
          });
          expect(User.create.calledOnce).to.be.equal(true);
          done();
        });
    });
  });
});