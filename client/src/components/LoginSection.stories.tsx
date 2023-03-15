import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoginSection from './LoginSection';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'components/LoginSection',
  component: LoginSection,
  argTypes: {
  },
} as ComponentMeta<typeof LoginSection>;

const Template: ComponentStory<typeof LoginSection> = (args) => <BrowserRouter><LoginSection /></BrowserRouter>;;

export const Default = Template.bind({});

Default.args = {
}
