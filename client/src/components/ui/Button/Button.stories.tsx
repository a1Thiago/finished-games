import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from './Button';

export default {
  title: 'components/ui/Button',
  component: Button,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  style: 'primary',
  label: 'Primary',
}

export const Secondary = Template.bind({});

Secondary.args = {
  style: 'secondary',
  label: 'Secondary',
}

export const Warn = Template.bind({});
Warn.args = {
  style: 'warn',
  label: 'Warn',
}
