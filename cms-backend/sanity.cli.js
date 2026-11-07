import { defineCliConfig } from "sanity/cli";
export default defineCliConfig({
  deployment: { appId: "be7c9nq12qsxff1zgzisoo1y" },
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "4isekt9n",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  studioHost: process.env.SANITY_STUDIO_HOSTNAME || "multiscale-ned-lab",
});
