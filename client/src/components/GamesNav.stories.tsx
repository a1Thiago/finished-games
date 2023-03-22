import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import GamesNav from './GamesNav';

export default {
  title: 'components/GamesNav',
  component: GamesNav,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof GamesNav>;

const Template: ComponentStory<typeof GamesNav> = (args) =>
  <BrowserRouter>
    {/*@ts-ignore */}
    <GamesNav selectedOption={() => { }}  {...args} />
  </BrowserRouter>

export const Default = Template.bind({});

Default.args = {
}

