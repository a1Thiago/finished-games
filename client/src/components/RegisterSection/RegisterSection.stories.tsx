import { ComponentMeta, ComponentStory } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import RegisterSection from './RegisterSection';

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
