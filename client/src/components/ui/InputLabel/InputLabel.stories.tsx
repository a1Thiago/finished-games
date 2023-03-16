import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputLabel from './InputLabel';

export default {
  title: 'components/ui/InputLabel',
  component: InputLabel,
  args: {
    label: 'Default',
    placeholder: 'Default',
    type: 'text',
  },

  argTypes: {
    icon: {
      control: {
        type: 'inline-radio',
        options: ['none', 'userName', 'password', 'email'],
      },
    }

  },
} as ComponentMeta<typeof InputLabel>;

const Template: ComponentStory<typeof InputLabel> = (args) => <InputLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default',
  placeholder: 'Default',
  type: 'text',
}

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: 'userName'
}
WithIcon.argTypes = {
  icon: {
    defaultValue: 'userName'
  }
}
