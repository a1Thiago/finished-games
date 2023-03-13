import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputLabel from './InputLabel';

export default {
  title: 'components/ui/InputLabel',
  component: InputLabel,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof InputLabel>;

const Template: ComponentStory<typeof InputLabel> = (args) => <InputLabel {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default',
  placeholder: 'Default',
  type: 'text'
}
// export const Small = Template.bind({});
// Small.args = {
//   size: 'sm',
//   children: 'Small'
// }
// export const Medium = Template.bind({});
// Medium.args = {
//   size: 'md',
//   children: 'Medium'
// }

