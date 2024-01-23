module.exports = {
  globalSetup: "./utils/getToken.js",
  // globalTeardown: "./setup_teardown/teardown/teardown.js",
  reporters: [
    [
      "jest-html-reporter",
      {
        outputPath: "./report/test-report.html",
        pageTitle: "Integration Test Report",
        includeFailureMsg: true,
      },
    ],
  ],
  testTimeout: 180000,
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
};
