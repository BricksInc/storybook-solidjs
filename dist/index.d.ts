import { Addon_ClientStoryApi, Addon_Loadable, Args, ComponentAnnotations, AnnotatedStoryFn, ArgsStoryFn, ArgsFromMeta, StoryAnnotations, DecoratorFunction, StrictArgs, LoaderFunction, StoryContext as StoryContext$1, ProjectAnnotations } from '@storybook/types';
export { ArgTypes, Args, Parameters, StrictArgs } from '@storybook/types';
import { S as SolidRenderer } from './types-b45ed22a.js';
import { Component, ComponentProps, JSX } from 'solid-js';
import { Simplify, SetOptional } from 'type-fest';

interface ClientApi extends Addon_ClientStoryApi<SolidRenderer['storyResult']> {
    configure(loader: Addon_Loadable, module: NodeModule): void;
    forceReRender(): void;
    raw: () => any;
}
declare const storiesOf: ClientApi['storiesOf'];
declare const configure: ClientApi['configure'];
declare const forceReRender: ClientApi['forceReRender'];
declare const raw: ClientApi['raw'];

type JSXElement = keyof JSX.IntrinsicElements;
/**
 * Metadata to configure the stories for a component.
 *
 * @see [Default export](https://storybook.js.org/docs/formats/component-story-format/#default-export)
 */
type Meta<TCmpOrArgs = Args> = TCmpOrArgs extends Component<any> ? ComponentAnnotations<SolidRenderer, ComponentProps<TCmpOrArgs>> : ComponentAnnotations<SolidRenderer, TCmpOrArgs>;
/**
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryFn<TCmpOrArgs = Args> = TCmpOrArgs extends Component<any> ? AnnotatedStoryFn<SolidRenderer, ComponentProps<TCmpOrArgs>> : AnnotatedStoryFn<SolidRenderer, TCmpOrArgs>;
/**
 * Story function that represents a CSFv3 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type StoryObj<TMetaOrCmpOrArgs = Args> = TMetaOrCmpOrArgs extends {
    render?: ArgsStoryFn<SolidRenderer, any>;
    component?: infer Component;
    args?: infer DefaultArgs;
} ? Simplify<(Component extends Component<any> ? ComponentProps<Component> : unknown) & ArgsFromMeta<SolidRenderer, TMetaOrCmpOrArgs>> extends infer TArgs ? StoryAnnotations<SolidRenderer, TArgs, SetOptional<TArgs, keyof TArgs & keyof (DefaultArgs & ActionArgs<TArgs>)>> : never : TMetaOrCmpOrArgs extends Component<any> ? StoryAnnotations<SolidRenderer, ComponentProps<TMetaOrCmpOrArgs>> : StoryAnnotations<SolidRenderer, TMetaOrCmpOrArgs>;
type ActionArgs<TArgs> = {
    [P in keyof TArgs as TArgs[P] extends (...args: any[]) => any ? ((...args: any[]) => void) extends TArgs[P] ? P : never : never]: TArgs[P];
};
/**
 * @deprecated Use `Meta` instead, e.g. ComponentMeta<typeof Button> -> Meta<typeof Button>.
 *
 * For the common case where a component's stories are simple components that receives args as props:
 *
 * ```tsx
 * export default { ... } as ComponentMeta<typeof Button>;
 * ```
 */
type ComponentMeta<T extends JSXElement> = Meta<ComponentProps<T>>;
/**
 * @deprecated Use `StoryFn` instead, e.g. ComponentStoryFn<typeof Button> -> StoryFn<typeof Button>.
 * Use `StoryObj` if you want to migrate to CSF3, which uses objects instead of functions to represent stories.
 * You can read more about the CSF3 format here: https://storybook.js.org/blog/component-story-format-3-0/
 *
 * For the common case where a (CSFv2) story is a simple component that receives args as props:
 *
 * ```tsx
 * const Template: ComponentStoryFn<typeof Button> = (args) => <Button {...args} />
 * ```
 */
type ComponentStoryFn<T extends JSXElement> = StoryFn<ComponentProps<T>>;
/**
 * @deprecated Use `StoryObj` instead, e.g. ComponentStoryObj<typeof Button> -> StoryObj<typeof Button>.
 *
 * For the common case where a (CSFv3) story is a simple component that receives args as props:
 *
 * ```tsx
 * const MyStory: ComponentStoryObj<typeof Button> = {
 *   args: { buttonArg1: 'val' },
 * }
 * ```
 */
type ComponentStoryObj<T extends JSXElement> = StoryObj<ComponentProps<T>>;
/**
 * @deprecated Use `StoryFn` instead.
 * Use `StoryObj` if you want to migrate to CSF3, which uses objects instead of functions to represent stories.
 * You can read more about the CSF3 format here: https://storybook.js.org/blog/component-story-format-3-0/
 *
 * Story function that represents a CSFv2 component example.
 *
 * @see [Named Story exports](https://storybook.js.org/docs/formats/component-story-format/#named-story-exports)
 */
type Story<TArgs = Args> = StoryFn<TArgs>;
/**
 * @deprecated Use `StoryFn` instead, e.g. ComponentStory<typeof Button> -> StoryFn<typeof Button>.
 * Use `StoryObj` if you want to migrate to CSF3, which uses objects instead of functions to represent stories
 * You can read more about the CSF3 format here: https://storybook.js.org/blog/component-story-format-3-0/.
 *
 * For the common case where a (CSFv3) story is a simple component that receives args as props:
 *
 * ```tsx
 * const MyStory: ComponentStory<typeof Button> = {
 *   args: { buttonArg1: 'val' },
 * }
 * ```
 */
type ComponentStory<T extends JSXElement> = ComponentStoryFn<T>;
/**
 * @deprecated Use Decorator instead.
 */
type DecoratorFn = DecoratorFunction<SolidRenderer>;
type Decorator<TArgs = StrictArgs> = DecoratorFunction<SolidRenderer, TArgs>;
type Loader<TArgs = StrictArgs> = LoaderFunction<SolidRenderer, TArgs>;
type StoryContext<TArgs = StrictArgs> = StoryContext$1<SolidRenderer, TArgs>;
type Preview = ProjectAnnotations<SolidRenderer>;

export { ComponentMeta, ComponentStory, ComponentStoryFn, ComponentStoryObj, Decorator, DecoratorFn, Loader, Meta, Preview, SolidRenderer, Story, StoryContext, StoryFn, StoryObj, configure, forceReRender, raw, storiesOf };
