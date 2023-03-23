import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddGameSection } from '@components/AddGameSection'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default {
  title: 'components/AddGameSection',
  component: AddGameSection,
  argTypes: {
  },
} as ComponentMeta<typeof AddGameSection>;

const Template: ComponentStory<typeof AddGameSection> = (args) =>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AddGameSection />
    </BrowserRouter>
  </QueryClientProvider>

export const Default = Template.bind({});

Default.args = {
}
