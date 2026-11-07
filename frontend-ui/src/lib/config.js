import project from "../../../sanity-project.json" with { type: "json" };
export const cmsConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || project.projectId,
  dataset: import.meta.env.VITE_SANITY_DATASET || project.dataset,
};
