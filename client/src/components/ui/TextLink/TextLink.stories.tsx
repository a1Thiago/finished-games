import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import TextLink from './TextLink';

export default {
  title: 'components/ui/TextLink',
  component: TextLink,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TextLink>;

const Template: ComponentStory<typeof TextLink> = (args) =>
  <BrowserRouter>
    <TextLink {...args} />
  </BrowserRouter>

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

