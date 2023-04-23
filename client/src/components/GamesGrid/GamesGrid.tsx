import { GameCard } from "@components/GameCard"
import { useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "@utils/axios"
import { ProgressBar } from "@components/ui/ProgressBar"
import { ErrorMessage } from "@components/ui/ErrorMessage"
import { AxiosResponse } from "axios"
import Cookies from "js-cookie";

export type Game = {
  id: number
  title: string
  cover?: string | null
  hours?: number | null
  dateOfFinish: string
  userId: number
  added: string
  lastModified?: string | null
}

type GamesGridProps = {
  isLoading: boolean,
  error: unknown,
  sortedGames: Game[]
}



export default function GamesGrid({ error, isLoading, sortedGames }: GamesGridProps) {

  // const { token } = localStorage.getItem('user') ? (JSON.parse(localStorage.getItem('user')!)) : ''
  const token = Cookies.get('accessToken') ?? null

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const mutation = useMutation(async (id: number) => {

    return await makeRequest.delete(`/api/games/delete/${id}`,
      { headers: { 'x-access-token': token } }
    )

  }, {
    onSuccess: (game: AxiosResponse<any, any>) => {
      queryClient.setQueryData(['games', game.data.deletedId], null)
      queryClient.invalidateQueries(['games'], { exact: true })
    },
  }
  )

  const handleDelete = async (id: Number): Promise<void> => {

    try {
      mutation.mutate(id as number)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  if (error) return <ErrorMessage message="Error" />

  if (isLoading) return <ProgressBar darkMode />

  if (sortedGames) {
    return (
      <div className="justify-center place-items-center my-8 grid gap-8 grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))]">
        {sortedGames?.map((game) => {
          return (
            <div key={game?.id}>
              <GameCard game={game}
                handleEdit={() => navigate(`/games/edit/${game?.id}`)}
                handleDelete={() => handleDelete(game?.id)} />
            </div>
          )
        })}
      </div>
    )
  } else return <></> //??
}