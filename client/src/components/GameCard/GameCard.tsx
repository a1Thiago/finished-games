import { Button } from "@ui/Button"
import { Text } from "@ui/Text"

type GameCardProps = {
  game: {
    id: number,
    title: string,
    cover?: string | null,
    hours?: number | null,
    dateOfFinish?: string | null,
  },
  handleEdit: () => void
  handleDelete: () => void
}

export default function GameCard({ game, handleDelete, handleEdit }: GameCardProps) {

  const { title, cover, hours, dateOfFinish } = game

  return (

    <div className="text-center items-center flex flex-col w-60  bg-white px-4 py-2  gap-4 shadow-custom rounded ">

      <div className="whitespace-nowrap text-ellipsis overflow-hidden w-[99%]" title={title}><Text size="md" ><h2 className="font-semibold ">{title}</h2></Text></div>

      <div className="h-60 w-40 bg-black-60"><img className="bg-blue-300 text-white h-full w-full object-fill leading-[240px] text-2xl -indent-4" src={cover ?? ''} title={title} alt={`${title.charAt(0)}`} /></div>

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
            {dateOfFinish && typeof dateOfFinish === 'string' && dateOfFinish?.substring(0, 10)}
          </Text>
        </div>
      </div>

      <div className="flex w-full gap-4">
        <Button onClick={handleDelete} style="warn" label="Delete" />
        <Button onClick={handleEdit} style="primary" label="Edit" />
      </div>

    </div>
  )
}