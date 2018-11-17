import { expect } from 'chai';

import validatePassword from '../auth/validatePassword';

describe('Auth module', function() {
  describe('validators', function() {
    it('should not password be less 8', function() {
      const isValid = validatePassword('12345');
      expect(isValid).to.equal(false);
    });
    it('should password be a string', function() {
      const isValid = validatePassword([1,2,3,4,5]);
      expect(isValid).to.equal(false);
    });
    it('should password be valid if password >= 8', function() {
      const isValid = validatePassword('1234');
      expect(isValid).to.equal(true);
    });
    it('should email be macth with pattern');
  });
});