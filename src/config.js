// src/config.js

// Change this once depending on your target
const ENV = "development"; // "test" | "production"

const config = {
  development: {
    apiUrl: "https://y2cqa979p5.execute-api.us-east-1.amazonaws.com/api/legallibrary/login", // Lambda (dev stage)
    debug: true,
  },
  test: {
    apiUrl: "https://y2cqa979p5.execute-api.us-east-1.amazonaws.com/api/legallibrary/login", // Lambda (test stage)
    debug: false,
  },
  production: {
    apiUrl: "https://y2cqa979p5.execute-api.us-east-1.amazonaws.com/api/legallibrary/login", // Lambda (prod stage)
    debug: false,
  },
};

export default {
  env: ENV,
  ...config[ENV],
};
