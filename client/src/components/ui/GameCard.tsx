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
    <div>
      {game.id}
      {game.title}
      {game.cover}
      {game.hours}
      {game.date}
      {game.platform}
      {game.link}
    </div>
  )
}