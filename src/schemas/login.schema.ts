export const loginSchema = {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 1, maxLength: 128 },
      password: { type: 'string', minLength: 6 },
    },
    required: ['username', 'password'],
  };
  