import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'dkrr3k',
  e2e: {
	  waitForAnimations: true,
	  supportFile: "cypress/support/e2e.js",
	  baseUrl:'http://localhost:8080/',
	  screenshotOnRunFailure: true,
	  screenshotsFolder: "cypress/screenshots",
	  video: false,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
