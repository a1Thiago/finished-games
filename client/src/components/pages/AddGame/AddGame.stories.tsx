import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddGame from './AddGame';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'components/pages/AddGame',
  component: AddGame,
  argTypes: {
  },
} as ComponentMeta<typeof AddGame>;

const Template: ComponentStory<typeof AddGame> = (args) => <BrowserRouter><AddGame /></BrowserRouter>;;

export const Default = Template.bind({});

Default.args = {
}
