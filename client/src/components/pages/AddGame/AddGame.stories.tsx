import { ComponentMeta, ComponentStory } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import AddGame from './AddGame';

const queryClient = new QueryClient()

export default {
  title: 'components/pages/AddGame',
  component: AddGame,
  argTypes: {
  },
} as ComponentMeta<typeof AddGame>;

const Template: ComponentStory<typeof AddGame> = (args) =>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AddGame />
    </BrowserRouter>
  </QueryClientProvider>

export const Default = Template.bind({});

Default.args = {
}
