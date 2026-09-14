import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemas } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";
import {
  applyCalculatorSeoAction,
  generateProposalsAction,
  markDoneManualAction,
  rejectSeoOpportunityAction,
} from "./src/sanity/actions/seoOpportunityActions";
import {
  publishArticleToSiteAction,
  unpublishArticleAction,
} from "./src/sanity/actions/articleActions";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "disabled";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "calcbase",
  title: "CalcBase",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemas },
  basePath: "/studio",
  document: {
    actions: (prev, context) => {
      if (context.schemaType === "seoOpportunity") {
        return [
          ...prev,
          applyCalculatorSeoAction,
          generateProposalsAction,
          markDoneManualAction,
          rejectSeoOpportunityAction,
        ];
      }
      if (context.schemaType === "article") {
        // Put our live-site publish first so it's visible in the bottom action bar.
        return [publishArticleToSiteAction, ...prev, unpublishArticleAction];
      }
      return prev;
    },
  },
});
