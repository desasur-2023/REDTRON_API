export const userSchema = {
    id: '/User',
    type: "object",

    properties: {
      username: {
        type: "string"
      },
      phone: {
        type: "string",
        pattern: "^[0-9]+$"
      },
      email: {
        type: "string",
        format: "email"
      },
      role: {
        type: "string",
        enum: ["ADMIN", "TELLER"]
      },
      percent_agreement:{
        type: "string",
        pattern: "^(?:100|[0-9]{1,2})$"
      },
      status: {
        type: "string",
        enum: ["ACTIVE", "INACTIVE", "DISABLED"]
      }

    },

    required: ["username", "phone", "percent_agreement"]
}
  