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
    link?: string
  }
}

export default function GameCard({ game }: GameCardProps) {

  return (

    <div className="text-center flex flex-col w-80  bg-white px-4 py-2 items-center gap-4 ">
      {/* {game.id}
      {game.title}
      {game.cover}
      {game.hours}
      {game.date}
      {game.platform}
      {game.link} */}
      <Heading><h2>Title</h2></Heading>

      <div className="h-60 w-40 bg-black-60"><img src={game?.cover} alt={game?.cover} /></div>

      <div className="h-16 w-72 flex gap-4">
        <div className="w-full flex flex-col gap-2">
          <Text size="md">Hours to finish</Text>
          <Text size="sm">
            {game?.hours}h
          </Text>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Text size="md">Date of finish</Text>
          <Text size="sm">
            {game?.date}h
          </Text>
        </div>
      </div>

      <div className="h-16 w-72 flex gap-4">

        <div className="h-16 w-72 flex gap-4">
          <div className="w-full flex flex-col gap-2">
            <Text size="md">Platform</Text>
            <Text size="sm">
              {game?.platform}Plat
            </Text>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Text size="md">Store Link</Text>
            <Text size="sm">
              {game?.link}icon
            </Text>
          </div>
        </div>

      </div>
      <div className="flex w-full gap-4">
        <Button type="primary" label="Edit" />
        <Button type="warn" label="Delete" />
      </div>

    </div>
  )
}