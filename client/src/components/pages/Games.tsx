import { Link } from "react-router-dom"
import GameCard from "@components/GameCard"
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from "@utils/axios"
import { useNavigate } from "react-router-dom"

interface Game {
  id: number,
  title: string,
  cover?: string,
  hours?: number,
  date?: string,
  platform?: string,
  link?: string
}


export default function Games() {

  const navigate = useNavigate()


  const { isLoading, error, data } = useQuery(['games'], async () => {
    const games = await makeRequest.get('/api/games/all')
    return games.data
  })

  const handleDelete = async (id: Number): Promise<any> => {

    try {

      await makeRequest.delete(`/api/games/delete/${id}`)

      navigate(0)//EDIT

    } catch (error: any) {

      throw new Error(error);
    }
  }

  return (
    <div>
      Games
      {error ? 'error'
        : isLoading ? 'loading'
          : data?.map((game: any) => {
            return (
              <div key={game.id}>
                <GameCard game={game}
                  handleEdit={() => navigate(`/games/edit/${game.id}`)}
                  handleDelete={() => handleDelete(game?.id)} />
              </div>
            )
          })}
      <button>
        <Link to={'/games/add'}>ADD</Link>
      </button>
    </div>
  )



}