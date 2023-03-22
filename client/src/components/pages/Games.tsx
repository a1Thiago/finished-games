import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import GameCard from "@components/GameCard"
import { makeRequest } from "@utils/axios"
import Button from "@ui/Button/Button"
import Listbox from "@ui/ListBox/ListBox"
import { sortArray } from '@utils/sortGames'
import GamesNav from "@components/GamesNav"


export default function Games() {

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery(['games'], async () => {

    const games = await makeRequest.get('/api/games/all')

    let data = games.data


    // return sortGames.addedAtAscending(data)
    // return sortGames.addedAtDescending(data)

    // return sortGames.alphabeticalAscending(data)
    // return sortGames.alphabeticalDescending(data)

    // return sortGames.hoursAscending(data)
    // return sortGames.hoursDescending(data)

    // return sortGames.dateOfFinishAscending(data)
    // return sortGames.dateOfFinishDescending(data)

    return data
  })

  const mutation = useMutation(async (id: number) => {
    return await makeRequest.delete(`/api/games/delete/${id}`)
  }, {
    onSuccess: (game) => {
      queryClient.invalidateQueries(['games'], { exact: true })
    },
  })

  const [selectedOption, setSelectedOption] = useState<any>(null)

  let sortedGames: Array<object> = data ? selectedOption?.fn(data) : []

  const handleDelete = async (id: Number): Promise<any> => {

    try {
      mutation.mutate(id as number)
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (

    <div className="">
      {/* <div className="flex bg-blue-200 p-4 my-4 justify-between ">
        <Button label="Add Game" style="primary" onClick={() => navigate('/games/add')} />
        <div className="h-10 grid justify-center">
          <Listbox optionsArray={sortArray} selectedOption={setSelectedOption} />
        </div>
      </div> */}

      <GamesNav />

      <div className="grid grid-cols-3 gap-8">
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

    </div >
  )
}
