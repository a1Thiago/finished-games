
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Heading from './Heading';

export default {
  title: 'components/ui/Heading',
  component: Heading,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Heading>;

const Template: ComponentStory<typeof Heading> = (args) => <Heading {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  children: 'Large'
}
export const XLarge = Template.bind({});
XLarge.args = {
  size: 'xl',
  children: 'XLarge'
}
export const X2Large = Template.bind({});
X2Large.args = {
  size: '2xl',
  children: '2XLarge'
}

