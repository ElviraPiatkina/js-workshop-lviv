import { expect } from 'chai';

import sinon from 'sinon';

import { User } from '../models';

import AuthModule from '../auth/AuthModule';

describe('Auth module', function() {
  describe('signup', function() {
    
    it('should create user with correct params', function(done) {
      sinon.spy(AuthModule, 'validateName');
      AuthModule.signup('john', 'john.doe@gmail.com', '12345678', '12345678')
        .then(res => {
          expect(AuthModule.validateName.calledOnce).to.be.equal(true);
          done();
        });
    });
  });
});