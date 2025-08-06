import { config, fields, collection } from "@keystatic/core";
import { wrapper } from "@keystatic/core/content-components";

// https://keystatic.com/docs/local-mode
// Set storage mode: "local" or "github"
let KEYSTATIC_STORAGE_MODE = "github";

// GitHub repository details (required for GitHub mode)
const GITHUB_REPO_OWNER = "merlets-au";
const GITHUB_REPO_NAME = "website";

export default config({
  storage:
    (KEYSTATIC_STORAGE_MODE as "github") === "github"
      ? {
        kind: "github",
        repo: `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`,
      }
      : {
        kind: "local",
      },

  collections: {
    pages: collection({
      label: "Pages",
      slugField: "title",
      path: "src/content/pages/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        content: fields.markdoc({
          label: "Content",
          components: {
            image: wrapper({
              label: "imageX",
              schema: {
                // src: fields.image({ label: "Path" }),
                src: fields.text({ label: "Path" }),
                alt: fields.text({ label: "Alt" }),
                width: fields.text({ label: "Width" }),
                height: fields.text({ label: "Height" }),
                caption: fields.text({ label: "Caption" })
                // image: fields.image({ publicPath:})
              }
            })
          },
          options: {
            image: {
              directory: "src/assets/images/pages",
              publicPath: "@images/pages/",
            },
          },
        }),
        date: fields.date({
          label: "Publication date",
          description: "The date of the publication",
        }),
      },
    }),
  },
});
