import { ComponentStory, ComponentMeta } from '@storybook/react';
import EditGame from './EditGame';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default {
  title: 'components/pages/EditGame',
  component: EditGame,
  argTypes: {
  },
} as ComponentMeta<typeof EditGame>;

const Template: ComponentStory<typeof EditGame> = (args) => <QueryClientProvider client={queryClient}>
  <BrowserRouter>
    <EditGame />
  </BrowserRouter>
</QueryClientProvider>;

export const Default = Template.bind({});

Default.args = {
}
