import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "utbc61",
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
