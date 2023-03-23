import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { GamesNav } from '@components/GamesNav';


export default {
  title: 'components/GamesNav',
  component: GamesNav,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof GamesNav>;

const Template: ComponentStory<typeof GamesNav> = (args) =>
  <BrowserRouter>
    <GamesNav selectedOption={() => { }} />
  </BrowserRouter>

export const Default = Template.bind({});

Default.args = {
}

