module.exports = {
  testEnvironment: "jsdom",
  transform: { "^.+\\\\.js$": "babel-jest" },
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/static/js/$1" }
};
