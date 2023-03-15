import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RegisterSection from './RegisterSection';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'components/RegisterSection',
  component: RegisterSection,
  argTypes: {
  },
} as ComponentMeta<typeof RegisterSection>;

const Template: ComponentStory<typeof RegisterSection> = (args) => <BrowserRouter><RegisterSection /></BrowserRouter>;;

export const Default = Template.bind({});

Default.args = {
}
