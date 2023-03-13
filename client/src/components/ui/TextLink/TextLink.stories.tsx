import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextLink from './TextLink';

export default {
  title: 'components/ui/TextLink',
  component: TextLink,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TextLink>;

const Template: ComponentStory<typeof TextLink> = (args) => <TextLink {...args} />;

export const XSmall = Template.bind({});
XSmall.args = {
  size: 'xs',
  children: 'XSmall'
}
export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  children: 'Small'
}
export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
  children: 'Medium'
}

