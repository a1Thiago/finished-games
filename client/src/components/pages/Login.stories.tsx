import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'components/pages/Login',
  component: Login,
  argTypes: {
  },
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <BrowserRouter><Login /></BrowserRouter>;;

export const Default = Template.bind({});

Default.args = {
}
