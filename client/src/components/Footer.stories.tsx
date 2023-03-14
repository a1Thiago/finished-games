import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';


export default {
  title: 'components/Footer',
  component: Footer,
  argTypes: {
  },
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <BrowserRouter><Footer /></BrowserRouter>;

// const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const Default = Template.bind({});

Default.args = {
}
