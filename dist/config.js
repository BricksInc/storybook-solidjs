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

// src/config.ts
var config_exports = {};
__export(config_exports, {
  applyDecorators: () => applyDecorators,
  argTypesEnhancers: () => argTypesEnhancers,
  decorators: () => allDecorators,
  parameters: () => parameters2,
  render: () => render,
  renderToCanvas: () => renderToCanvas
});
module.exports = __toCommonJS(config_exports);

// src/docs/config.ts
var import_docs_tools = require("@storybook/docs-tools");

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
    extractComponentDescription: import_docs_tools.extractComponentDescription
  }
};
var argTypesEnhancers = [import_docs_tools.enhanceArgTypes];

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
var solidReactivityDecorator = (storyFn, context) => {
  let storyId = context.canvasElement.id;
  context.args = store[storyId].args;
  return storyFn(context.args, context);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyDecorators,
  argTypesEnhancers,
  decorators,
  parameters,
  render,
  renderToCanvas
});
