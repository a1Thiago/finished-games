import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { sortArray } from '@utils/sortGames';

import ListBox from './ListBox';

export default {
  title: 'components/ui/ListBox',
  component: ListBox,
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <div className='w-full grid items-center justify-center bg-black-100'> <ListBox selectedOption={() => { }} optionsArray={sortArray as any}
// {...args} 
/></div>


export const Default = Template.bind({});
Default.args = {

}

