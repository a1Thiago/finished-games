import Button from "./ui/Button/Button"
import Heading from "./ui/Heading/Heading"
import Text from "./ui/Text/Text"

type GameCardProps = {
  game: {
    id: number,
    title: string,
    cover?: string,
    hours?: number,
    date?: string,
    platform?: string,
    link?: string,

  },
  handleEdit: () => void
  handleDelete: () => void
}

export default function GameCard({ game, handleDelete, handleEdit }: GameCardProps) {

  return (

    <div className="text-center flex flex-col w-80  bg-white px-4 py-2 items-center gap-4 shadow-custom">

      <Text size="md"><h2 className="font-semibold">{game?.title}</h2></Text>

      <div className="h-60 w-40 bg-black-60"><img src={game?.cover} alt={game?.cover} /></div>

      <div className="h-16 w-72 grid grid-cols-2">
        <div className="flex flex-col gap-2">
          <Text size="sm">Hours to finish</Text>
          <Text size="xs">
            {game?.hours}h
          </Text>
        </div>
        <div className="flex flex-col gap-2">
          <Text size="sm">Date of finish</Text>
          <Text size="xs">
            {game?.date?.substring(0, 10)}
          </Text>
        </div>
      </div>

      <div className="h-16 w-72 grid grid-cols-2">
        <div className="flex flex-col gap-2">
          <Text size="sm">Platform</Text>
          <Text size="xs">
            {game?.platform}
          </Text>
        </div>
        <div className="flex flex-col gap-2">
          <Text size="sm">Store Link</Text>
          <Text size="xs">
            {game?.link}
          </Text>
        </div>
      </div>

      <div className="flex w-full gap-4">
        <Button onClick={handleEdit} style="primary" label="Edit" />
        <Button onClick={handleDelete} style="warn" label="Delete" />
      </div>

    </div>
  )
}