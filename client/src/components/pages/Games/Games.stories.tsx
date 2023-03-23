import { ComponentStory, ComponentMeta } from '@storybook/react';
import Games from './Games';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default {
  title: 'components/pages/Games',
  component: Games,
  argTypes: {
  },
} as ComponentMeta<typeof Games>;

const Template: ComponentStory<typeof Games> = (args) =>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Games />
    </BrowserRouter>
  </QueryClientProvider>;

export const Default = Template.bind({});

Default.args = {
}
