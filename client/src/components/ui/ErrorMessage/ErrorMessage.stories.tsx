import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ErrorMessage } from './index';

export default {
  title: 'Components/ui/ErrorMessage',
  component: ErrorMessage,
  args: {
    message: 'string'
  },
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (args) => (
  <ErrorMessage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  message: 'error'
};
