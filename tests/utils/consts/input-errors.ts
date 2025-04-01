export const EMAIL_INPUT_ERRORS = [
  { value: '!#', errorMessage: 'Please enter a valid email' },
  { value: 'test@pl', errorMessage: 'Please enter a valid email' },
];

export const PASSWORD_INPUT_ERRORS = [
  { value: 'tst', errorMessage: 'Password must contain at least 8 characters' },
  { value: 'testtest1', errorMessage: 'Password must contain at least one uppercase letter' },
  { value: 'TESTTEST1', errorMessage: 'Password must contain at least one lowercase letter' },
  { value: 'TestTest', errorMessage: 'Password must contain at least one digit' },
  { value: 'TestTest1', errorMessage: 'Password must contain at least one special character' },
];
