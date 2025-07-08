import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'dkrr3k',
  e2e: {
	  screenshotOnRunFailure: true,
	  screenshotsFolder: "cypress/screenshots",
	  video: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
