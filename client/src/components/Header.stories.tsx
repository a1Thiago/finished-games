import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';


export default {
  title: 'components/Header',
  component: Header,
  argTypes: {
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <BrowserRouter><Header /></BrowserRouter>;

// const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});

Default.args = {
}
