import GameCard from "@components/GameCard"
import { makeRequest } from "@utils/axios"
import { useNavigate } from "react-router-dom"
import Button from "@components/ui/Button/Button"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Games() {

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery(['games'], async () => {

    const games = await makeRequest.get('/api/games/all')

    return games.data
  })


  const mutation = useMutation(async (id: number) => {
    return await makeRequest.delete(`/api/games/delete/${id}`)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['games'])
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
    <div className="">

      <div className="flex bg-blue-200 p-4 my-4">
        <Button label="Add Game" style="primary" onClick={() => navigate('/games/add')} />
      </div>

      <div className="grid grid-cols-3 gap-8">
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
      </div>

    </div>
  )



}