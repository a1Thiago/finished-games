import { ComponentStory, ComponentMeta } from '@storybook/react';
import HomeImages from './HomeImages';

export default {
  title: 'components/HomeImages',
  component: HomeImages,
  argTypes: {
  },
} as ComponentMeta<typeof HomeImages>;

const Template: ComponentStory<typeof HomeImages> = (args) => <HomeImages />;

export const Default = Template.bind({});

Default.args = {
}
