import { defineMarkdocConfig, nodes, component } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  tags: {
    sidebar: {
      render: component("./src/components/sections/Sidebar.astro"),
      attributes: {
        // Markdoc requires type defs for each attribute.
        // These should mirror the `Props` type of the component
        // you are rendering.
        // See Markdoc's documentation on defining attributes
        // https://markdoc.dev/docs/attributes#defining-attributes
        type: { type: String },
      },
    },
    ctabutton: {
      attributes: {
        href: { type: String },
        variant: { type: String },
        openInNewTab: { type: Boolean },
        text: {
          type: String,
        },
      },
      render: component("./src/components/common/MarkdocCTA.astro"),
    },

    captionImage: {
      attributes: {
        width: { type: String },
        height: { type: String },
        caption: { type: String },
        image: { type: String },
        ...nodes.image.attributes,
      },
      render: component("./src/components/common/MarkdocFigure.astro"),
    },
    image: {
      attributes: {
        width: {
          type: String,
        },
        height: {
          type: String,
        },
        caption: {
          type: String,
        },
        ...nodes.image.attributes,
      },
      render: component("./src/components/common/MarkdocImage.astro.astro"),
    },
  },
  nodes: {
    image: {
      ...nodes.image, // Apply Markdoc's defaults for other options
      render: component("./src/components/common/MarkdocImage.astro"),
    },
  },
});
