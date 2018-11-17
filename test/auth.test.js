import { expect } from 'chai';
import Chance from 'chance';

import validatePassword from '../auth/validatePassword';

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
    it('should email be macth with pattern');
  });
});