"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  configure: () => configure,
  forceReRender: () => forceReRender,
  raw: () => raw,
  storiesOf: () => storiesOf
});
module.exports = __toCommonJS(src_exports);

// src/globals.ts
var import_global = require("@storybook/global");
var { window: globalWindow } = import_global.global;
globalWindow.STORYBOOK_ENV = "solid";

// src/public-api.ts
var import_preview_api = require("@storybook/preview-api");

// src/render.tsx
var import_web = require("solid-js/web");
var import_web2 = require("solid-js/web");
var import_solid_js = require("solid-js");
var import_store = require("solid-js/store");
var import_web3 = require("solid-js/web");
var [store, setStore] = (0, import_store.createStore)({});
var delay = async (ms = 20) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};
var globals;
var componentId;
var viewMode;
var remount = (force, context) => {
  let flag = false;
  if (viewMode !== context.viewMode)
    flag = true;
  if (force)
    flag = true;
  if (!Object.is(globals, context.globals))
    flag = true;
  if (componentId !== context.componentId) {
    flag = true;
    unmountAll();
  }
  if (flag === true) {
    viewMode = context.viewMode;
    globals = context.globals;
    componentId = context.componentId;
  }
  return flag;
};
var render = (_, context) => {
  const {
    id,
    component: Component
  } = context;
  if (!Component) {
    throw new Error(`Unable to render story ${id} as the component annotation is missing from the default export`);
  }
  return (0, import_web.createComponent)(Component, (0, import_web2.mergeProps)(() => context.args));
};
var disposeAllStories = () => {
  Object.keys(store).forEach((storyId) => {
    var _a, _b;
    (_b = (_a = store[storyId]) == null ? void 0 : _a.disposeFn) == null ? void 0 : _b.call(_a);
  });
};
var cleanStore = () => {
  setStore((0, import_store.reconcile)({}));
};
var unmountAll = () => {
  disposeAllStories();
  cleanStore();
};
var cleanStoryStore = (storeId) => {
  setStore({
    [storeId]: {
      args: {},
      rendered: false,
      disposeFn: () => {
      }
    }
  });
};
var disposeStory = (storeId) => {
  var _a, _b;
  (_b = (_a = store[storeId]) == null ? void 0 : _a.disposeFn) == null ? void 0 : _b.call(_a);
};
var remountStory = (storyId) => {
  disposeStory(storyId);
  cleanStoryStore(storyId);
};
var storyIsRendered = (storyId) => {
  var _a;
  return Boolean((_a = store[storyId]) == null ? void 0 : _a.rendered);
};
var isDocsMode = (context) => context.viewMode === "docs";
var renderSolidApp = (storyId, renderContext, canvasElement) => {
  const {
    storyContext,
    unboundStoryFn,
    showMain,
    showException
  } = renderContext;
  setStore(storyId, "rendered", true);
  const App = () => {
    const Story = unboundStoryFn;
    (0, import_solid_js.onMount)(() => {
      showMain();
    });
    return (0, import_web.createComponent)(import_solid_js.ErrorBoundary, {
      fallback: (err) => {
        showException(err);
        return err;
      },
      get children() {
        return (0, import_web.createComponent)(Story, storyContext);
      }
    });
  };
  return (0, import_web3.render)(() => (0, import_web.createComponent)(App, {}), canvasElement);
};
async function renderToCanvas(renderContext, canvasElement) {
  const {
    storyContext
  } = renderContext;
  let forceRemount = renderContext.forceRemount;
  let storyId = storyContext.canvasElement.id;
  if (viewMode === void 0)
    viewMode = storyContext.viewMode;
  if (globals === void 0)
    globals = storyContext.globals;
  if (componentId === void 0)
    componentId = storyContext.componentId;
  if (remount(forceRemount, storyContext)) {
    remountStory(storyId);
  }
  setStore(storyId, "args", storyContext.args);
  if (storyIsRendered(storyId) === false) {
    if (isDocsMode(storyContext))
      await delay();
    const disposeFn = renderSolidApp(storyId, renderContext, canvasElement);
    setStore(storyId, (prev) => ({
      ...prev,
      disposeFn
    }));
  }
}

// src/public-api.ts
var RENDERER = "solid";
var api = (0, import_preview_api.start)(renderToCanvas, { render });
var storiesOf = (kind, m) => {
  return api.clientApi.storiesOf(kind, m).addParameters({
    renderer: RENDERER
  });
};
var configure = (...args) => api.configure(RENDERER, ...args);
var forceReRender = api.forceReRender;
var raw = api.clientApi.raw;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  configure,
  forceReRender,
  raw,
  storiesOf
});
