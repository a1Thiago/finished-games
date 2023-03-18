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

  const { title, cover, hours, date, platform, link } = game

  return (

    <div className="text-center flex flex-col w-60  bg-white px-4 py-2 items-center gap-4 shadow-custom overflow-auto  whitespace-nowrap">

      <Text size="md"><h2 className="font-semibold ">{title}</h2></Text>

      <div className="h-60 w-40 bg-black-60"><img src={cover} alt={cover} /></div>

      <div className="grid gap-4">
        <div className="flex flex-col gap-2">
          <Text size="sm" className="font-medium">Hours to finish</Text>
          <Text size="xs">
            {hours}h
          </Text>
        </div>
        <div className="flex flex-col gap-2">
          <Text size="sm" className="font-medium">Date of finish</Text>
          <Text size="xs">
            {date?.substring(0, 10)}
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