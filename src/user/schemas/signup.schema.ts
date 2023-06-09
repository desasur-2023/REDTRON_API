export const signUpSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 1, maxLength: 128 },
    phone: { type: 'string',  pattern: /^\+\d{1,3}\d{1,3}\d{6,}$/ },
    password: { type: 'string', minLength: 6 },
    email: { type: 'string', format: 'email' },
    role: { type: 'string', enum: ['admin', 'teller'] },
    status: { type: 'string', enum: ['active', 'inactive', 'disable'] },
  },
  required: ['username', 'phone', 'password', 'role'],
};
