import { config, fields, collection } from "@keystatic/core";
import {
  block,
  wrapper,
  type ContentComponent,
} from "@keystatic/core/content-components";

let KEYSTATIC_STORAGE_MODE =
  process.env.NODE_ENV === "development" ? "local" : "github";

const components: (name: string) => Record<string, ContentComponent> = (
  name,
) => {
  return {
    ctabutton: block({
      label: "Button",
      ContentView: (props) => props.value.text,
      schema: {
        href: fields.text({ label: "Link" }),
        openInNewTab: fields.checkbox({ label: "Open In New Tab" }),
        text: fields.text({ label: "Text" }),
        variant: fields.text({ label: "Colour Variant" }),
      },
    }),
    captionImage: block({
      label: "Image with Caption",
      ContentView: (props) =>
        props.value.caption ? props.value.caption : props.value.src?.filename,
      schema: {
        src: fields.image({
          label: "Image",
          directory: `src/assets/images/${name}`,
          // publicPath: `/src/assets/images/${name}/`,
          publicPath: `@images/${name}/`,
        }),
        width: fields.text({ label: "Width" }),
        height: fields.text({ label: "Height" }),
        caption: fields.text({ label: "Caption" }),
      },
    }),
  };
};

export default config({
  storage:
    (KEYSTATIC_STORAGE_MODE as "github") === "github"
      ? { kind: "github", repo: `merlets-au/website` }
      : { kind: "local" },
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
          components: components("pages"),
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

    homepage: collection({
      label: "Homepage",
      slugField: "title",
      path: "src/content/homepage/*",
      entryLayout: "content",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        content: fields.markdoc({
          label: "Content",
          components: components("homepage"),
          options: {
            image: {
              directory: "src/assets/images/homepage",
              publicPath: "@images/homepage/",
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
