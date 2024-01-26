import {
  render,
  renderToCanvas,
  solidReactivityDecorator
} from "./chunk-6VA2C2EE.mjs";

// src/docs/config.ts
import {
  extractComponentDescription,
  enhanceArgTypes
} from "@storybook/docs-tools";

// src/docs/jsxDecorator.tsx
var jsxDecorator = (storyFn, _) => {
  const story = storyFn();
  return story;
};

// src/docs/config.ts
var decorators = [jsxDecorator];
var parameters = {
  docs: {
    story: { inline: true },
    extractComponentDescription
  }
};
var argTypesEnhancers = [enhanceArgTypes];

// src/decorators.ts
var allDecorators = [solidReactivityDecorator, ...decorators];
var applyDecorators = (storyFn, decorators2) => {
  return decorators2.reduce(
    (decoratedStoryFn, decorator) => (context) => {
      return decorator(() => decoratedStoryFn(context), context);
    },
    (context) => storyFn(context)
  );
};

// src/config.ts
var parameters2 = { renderer: "solid", ...parameters };
export {
  applyDecorators,
  argTypesEnhancers,
  allDecorators as decorators,
  parameters2 as parameters,
  render,
  renderToCanvas
};
