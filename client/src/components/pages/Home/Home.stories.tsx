import { ComponentStory, ComponentMeta } from '@storybook/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'components/pages/Home',
  component: Home,
  argTypes: {
  },
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) =>
  <BrowserRouter>
    <Home />
  </BrowserRouter>

export const Default = Template.bind({});

Default.args = {
}
