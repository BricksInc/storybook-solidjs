import * as _storybook_docs_tools from '@storybook/docs-tools';
import * as _storybook_types from '@storybook/types';
import { ArgsStoryFn, RenderContext } from '@storybook/types';
import { S as SolidRenderer } from './types-b45ed22a.js';
import * as solid_js from 'solid-js';
import { PartialStoryFn, Args, DecoratorFunction, StoryContext } from '@storybook/csf';

declare const argTypesEnhancers: (<TRenderer extends _storybook_types.Renderer>(context: _storybook_types.StoryContextForEnhancers<TRenderer, _storybook_types.Args>) => _storybook_types.StrictArgTypes<_storybook_types.Args>)[];

/**
 * Default render function for a story definition (inside a csf file) without
 * a render function. e.g:
 * ```typescript
 * export const StoryExample = {
 *  args: {
 *    disabled: true,
 *    children: "Hello World",
 *  },
 * };
 * ```
 */
declare const render: ArgsStoryFn<SolidRenderer>;
/**
 * Main renderer function for initializing the SolidJS app
 * with the story content.
 */
declare function renderToCanvas(renderContext: RenderContext<SolidRenderer>, canvasElement: SolidRenderer['canvasElement']): Promise<void>;

declare const allDecorators: ((storyFn: _storybook_types.PartialStoryFn<SolidRenderer, _storybook_types.Args>, _: _storybook_types.StoryContext<SolidRenderer, _storybook_types.Args>) => solid_js.JSX.Element)[];
declare const applyDecorators: (storyFn: PartialStoryFn<SolidRenderer, Args>, decorators: DecoratorFunction<SolidRenderer, Args>[]) => (context: StoryContext<SolidRenderer>) => solid_js.JSX.Element;

declare const parameters: {
    docs: {
        story: {
            inline: boolean;
        };
        extractComponentDescription: typeof _storybook_docs_tools.extractComponentDescription;
    };
    renderer: string;
};

export { applyDecorators, argTypesEnhancers, allDecorators as decorators, parameters, render, renderToCanvas };
