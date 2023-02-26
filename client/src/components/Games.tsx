import { Link } from "react-router-dom"
import useFetch from "../utils/useFetch"
import GameCard from "./sub/GameCard"

export default function Games() {

  const url = 'http://localhost:8000/games'

  interface Game {
    id: number,
    title: string,
    cover?: string,
    hours?: number,
    date?: string,
    platform?: string,
    link?: string
  }


  const handleDelete = async (id: Number): Promise<any> => {

    const url = `http://localhost:8000/games/${id}`

    try {
      await fetch(url, {
        method: 'DELETE',
      })
      //STATE RE-RENDER
      window.location.reload()
    } catch (error) {
      //ERRORRR MSG
    }

  }

  const { data, error } = useFetch<Game[]>(url)

  if (error) return <p>There is an error.</p>

  if (!data) return <p>Loading...</p>

  return (
    <div>
      Games
      {data.map((game) => {
        return (
          <div key={game.id}>
            <GameCard game={game} />
            <button onClick={() => handleDelete(game?.id)}>DELETE</button>
            <button ><Link to={`/edit/${game.id}`}>EDIT</Link></button>
          </div>
        )
      })}
      <button>
        <Link to={'/add'}>ADD</Link>
      </button>
    </div>
  )



}