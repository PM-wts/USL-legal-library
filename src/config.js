// src/config.js

// Change this once depending on your target
const ENV = "development"; // "test" | "production"

const config = {
  development: {
    apiUrl: "https://abcd1234.execute-api.us-east-1.amazonaws.com/dev", // Lambda (dev stage)
    debug: true,
  },
  test: {
    apiUrl: "https://abcd1234.execute-api.us-east-1.amazonaws.com/test", // Lambda (test stage)
    debug: false,
  },
  production: {
    apiUrl: "https://abcd1234.execute-api.us-east-1.amazonaws.com/prod", // Lambda (prod stage)
    debug: false,
  },
};

export default {
  env: ENV,
  ...config[ENV],
};
