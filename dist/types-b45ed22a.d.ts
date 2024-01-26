import { Component, JSXElement } from 'solid-js';
import { WebRenderer } from '@storybook/types';

interface SolidRenderer extends WebRenderer {
    component: Component<this['T']>;
    storyResult: StoryFnSolidReturnType;
}
type StoryFnSolidReturnType = JSXElement;

export { SolidRenderer as S };
