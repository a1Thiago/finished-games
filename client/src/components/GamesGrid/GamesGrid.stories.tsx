import { ComponentStory, ComponentMeta } from '@storybook/react';
import GamesGrid from './GamesGrid';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient()

const sortedGames = [
  {
    "id": 245,
    "title": "a",
    "cover": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Logo_of_A1.svg/1024px-Logo_of_A1.svg.png",
    "hours": 3,
    "dateOfFinish": "3333-03-31T03:00:00.000Z",
    "userId": 78,
    "added": "2023-03-20T03:00:00.000Z",
    "lastModified": "2023-03-22T03:00:00.000Z"
  },
  {
    "id": 246,
    "title": "b",
    "cover": "http://www.feuso.es/images/img/actualidad/20180614_cursoinglesb2.jpg",
    "hours": 2,
    "dateOfFinish": "2222-02-22T03:00:00.000Z",
    "userId": 78,
    "added": "2023-03-20T03:00:00.000Z",
    "lastModified": "2023-03-21T03:00:00.000Z"
  },
  {
    "id": 330,
    "title": "c",
    "cover": "",
    "hours": 0,
    "dateOfFinish": "2023-03-22T03:00:00.000Z",
    "userId": 78,
    "added": "2023-03-22T03:00:00.000Z",
    "lastModified": null
  },
  {
    "id": 331,
    "title": "d",
    "cover": "",
    "hours": 0,
    "dateOfFinish": "2023-03-22T03:00:00.000Z",
    "userId": 78,
    "added": "2023-03-22T03:00:00.000Z",
    "lastModified": null
  },
  {
    "id": 332,
    "title": "e",
    "cover": "",
    "hours": 0,
    "dateOfFinish": "2023-03-22T03:00:00.000Z",
    "userId": 78,
    "added": "2023-03-22T03:00:00.000Z",
    "lastModified": null
  },
  {
    "id": 333,
    "title": "f",
    "cover": "",
    "hours": 0,
    "dateOfFinish": "2023-03-22T03:00:00.000Z",
    "userId": 78,
    "added": "2023-03-22T03:00:00.000Z",
    "lastModified": null
  },
  {
    "id": 245,
    "title": "a",
    "cover": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Logo_of_A1.svg/1024px-Logo_of_A1.svg.png",
    "hours": 3,
    "dateOfFinish": "3333-03-31T03:00:00.000Z",
    "userId": 78,
    "added": "2023-03-20T03:00:00.000Z",
    "lastModified": "2023-03-22T03:00:00.000Z"
  },
  // {
  //   "id": 246,
  //   "title": "b",
  //   "cover": "http://www.feuso.es/images/img/actualidad/20180614_cursoinglesb2.jpg",
  //   "hours": 2,
  //   "dateOfFinish": "2222-02-22T03:00:00.000Z",
  //   "userId": 78,
  //   "added": "2023-03-20T03:00:00.000Z",
  //   "lastModified": "2023-03-21T03:00:00.000Z"
  // },
  // {
  //   "id": 330,
  //   "title": "c",
  //   "cover": "",
  //   "hours": 0,
  //   "dateOfFinish": "2023-03-22T03:00:00.000Z",
  //   "userId": 78,
  //   "added": "2023-03-22T03:00:00.000Z",
  //   "lastModified": null
  // },
  // {
  //   "id": 331,
  //   "title": "d",
  //   "cover": "",
  //   "hours": 0,
  //   "dateOfFinish": "2023-03-22T03:00:00.000Z",
  //   "userId": 78,
  //   "added": "2023-03-22T03:00:00.000Z",
  //   "lastModified": null
  // },
  // {
  //   "id": 332,
  //   "title": "e",
  //   "cover": "",
  //   "hours": 0,
  //   "dateOfFinish": "2023-03-22T03:00:00.000Z",
  //   "userId": 78,
  //   "added": "2023-03-22T03:00:00.000Z",
  //   "lastModified": null
  // },
  // {
  //   "id": 333,
  //   "title": "f",
  //   "cover": "",
  //   "hours": 0,
  //   "dateOfFinish": "2023-03-22T03:00:00.000Z",
  //   "userId": 78,
  //   "added": "2023-03-22T03:00:00.000Z",
  //   "lastModified": null
  // },
]

export default {
  title: 'components/GamesGrid',
  component: GamesGrid,
  argTypes: {
    error: { control: 'boolean' },
  },
} as ComponentMeta<typeof GamesGrid>;

const Template: ComponentStory<typeof GamesGrid> = (args) =>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <GamesGrid  {...args} />
    </QueryClientProvider>
  </BrowserRouter>

export const Default = Template.bind({});
Default.args = {
  sortedGames: sortedGames,
  isLoading: false,
  error: false
}

export const isLoading = Template.bind({});
isLoading.args = {
  isLoading: true,
}

export const isError = Template.bind({});
isError.args = {
  error: true,
}
