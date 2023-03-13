import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NavBar from './NavBar';

import { BrowserRouter } from 'react-router-dom';


export default {
  title: 'components/NavBar',
  component: NavBar,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = (args) => <BrowserRouter><NavBar /></BrowserRouter>;



// const Template: ComponentStory<typeof NavBar> = (args) => <NavBar {...args} />;

export const Default = Template.bind({});

Default.args = {
}
