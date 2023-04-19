import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProgressBar } from "@ui/ProgressBar"

export default {
  title: 'components/ui/ProgressBar',
  component: ProgressBar,
  argTypes: {
    progressPercentage: { control: 'range' },
  },
} as ComponentMeta<typeof ProgressBar>;

const Template: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  progressPercentage: 50
}

