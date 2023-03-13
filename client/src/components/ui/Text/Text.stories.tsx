import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Text from './Text';

export default {
  title: 'components/ui/Text',
  component: Text,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

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

