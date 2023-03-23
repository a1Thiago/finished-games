import { ComponentStory, ComponentMeta } from '@storybook/react';
import EditGameSection from './EditGameSection';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default {

  title: 'components/EditGameSection',
  component: EditGameSection,
  argTypes: {
  },
} as ComponentMeta<typeof EditGameSection>;



const Template: ComponentStory<typeof EditGameSection> = (args) =>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <EditGameSection />
    </BrowserRouter>
  </QueryClientProvider>;

export const Default = Template.bind({});

Default.args = {
}
