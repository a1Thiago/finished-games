import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import GameCard from './GameCard';

export default {
  title: 'components/GameCard',
  component: GameCard,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof GameCard>;

const Template: ComponentStory<typeof GameCard> = (args) => <GameCard {...args} />;

export const Default = Template.bind({});

Default.args = {
}
