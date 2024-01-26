// src/render.tsx
import { createComponent as _$createComponent } from "solid-js/web";
import { mergeProps as _$mergeProps } from "solid-js/web";
import { ErrorBoundary, onMount } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { render as solidRender } from "solid-js/web";
var [store, setStore] = createStore({});
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
  return _$createComponent(Component, _$mergeProps(() => context.args));
};
var disposeAllStories = () => {
  Object.keys(store).forEach((storyId) => {
    store[storyId]?.disposeFn?.();
  });
};
var cleanStore = () => {
  setStore(reconcile({}));
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
  store[storeId]?.disposeFn?.();
};
var remountStory = (storyId) => {
  disposeStory(storyId);
  cleanStoryStore(storyId);
};
var storyIsRendered = (storyId) => Boolean(store[storyId]?.rendered);
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
    onMount(() => {
      showMain();
    });
    return _$createComponent(ErrorBoundary, {
      fallback: (err) => {
        showException(err);
        return err;
      },
      get children() {
        return _$createComponent(Story, storyContext);
      }
    });
  };
  return solidRender(() => _$createComponent(App, {}), canvasElement);
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

export {
  solidReactivityDecorator,
  render,
  renderToCanvas
};
