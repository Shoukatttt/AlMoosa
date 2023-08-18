const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    debug:true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      screenshotOnRunFailure = true
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
