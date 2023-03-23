import { ComponentStory, ComponentMeta } from '@storybook/react';

const game1 = {
  "id": 116,
  "title": "Lair of the Clockwork God",
  "cover": "https://ptpimg.me/w4ju57.jpg",
  "hours": 12,
  "date": "2023-03-13T03:00:00.000Z",
  "userId": 55
}

import GameCard from './GameCard';

export default {
  title: 'components/GameCard',
  component: GameCard,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof GameCard>;

// const Template: ComponentStory<typeof GameCard> = (args) => <GameCard game={game1}  {...args} />;

// export const Default = Template.bind({});

// Default.args = {
// }

