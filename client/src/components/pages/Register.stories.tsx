import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'components/pages/Register',
  component: Register,
  argTypes: {
  },
} as ComponentMeta<typeof Register>;

const Template: ComponentStory<typeof Register> = (args) => <BrowserRouter><Register /></BrowserRouter>;;

export const Default = Template.bind({});

Default.args = {
}
