import { GameCard } from "@components/GameCard"
import { useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "@utils/axios"

type GamesNavProps = {
  isLoading: boolean,
  error: unknown,
  sortedGames: Array<object>
}

export default function GamesGrid({ error, isLoading, sortedGames }: GamesNavProps) {

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const mutation = useMutation(async (id: number) => {
    return await makeRequest.delete(`/api/games/delete/${id}`)
  }, {
    onSuccess: (game) => {
      queryClient.invalidateQueries(['games'], { exact: true })
    },
  })

  const handleDelete = async (id: Number): Promise<any> => {

    try {
      mutation.mutate(id as number)
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <div className="justify-center place-items-center my-8
    grid gap-8 grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))]">
      {error ? 'error'
        : isLoading ? 'loading'
          : sortedGames?.map((game: any) => {
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
}