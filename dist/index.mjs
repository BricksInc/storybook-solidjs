import {
  render,
  renderToCanvas
} from "./chunk-6VA2C2EE.mjs";

// src/globals.ts
import { global } from "@storybook/global";
var { window: globalWindow } = global;
globalWindow.STORYBOOK_ENV = "solid";

// src/public-api.ts
import { start } from "@storybook/preview-api";
var RENDERER = "solid";
var api = start(renderToCanvas, { render });
var storiesOf = (kind, m) => {
  return api.clientApi.storiesOf(kind, m).addParameters({
    renderer: RENDERER
  });
};
var configure = (...args) => api.configure(RENDERER, ...args);
var forceReRender = api.forceReRender;
var raw = api.clientApi.raw;
export {
  configure,
  forceReRender,
  raw,
  storiesOf
};
