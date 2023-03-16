import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddGameSection from './AddGameSection';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'components/AddGameSection',
  component: AddGameSection,
  argTypes: {
  },
} as ComponentMeta<typeof AddGameSection>;

const Template: ComponentStory<typeof AddGameSection> = (args) => <BrowserRouter><AddGameSection /></BrowserRouter>;;

export const Default = Template.bind({});

Default.args = {
}
