import GameCard from "@components/GameCard"
import { makeRequest } from "@utils/axios"
import { useNavigate } from "react-router-dom"
import Button from "@components/ui/Button/Button"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Listbox from "@ui/ListBox/ListBox";

export default function Games() {

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery(['games'], async () => {

    const games = await makeRequest.get('/api/games/all')

    let data = games.data


    return data // addedAtAscending

    // data = data.sort((a: any, b: any) => parseFloat(a.dateOfFinish) - parseFloat(b.dateOfFinish))//dateOfFinishAscending




    // data = data.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id))//addedAtDescending

    // data = data.sort((a: any, b: any) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()))//alphabeticalAscending

    // data = data.sort((a: any, b: any) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()))//alphabeticalDescending


    // data = data.sort((a: any, b: any) => parseFloat(b.hours) - parseFloat(a.hours))//hoursDescending

    // data = data.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id))//hoursDescending

    // data = data.sort((a: any, b: any) => {

    //   const first = a?.dateOfFinish
    //   const second = b?.dateOfFinish

    //   if (!first || !second) {
    //     return 0
    //   } else {
    //     return parseFloat(first) - parseFloat(second)
    //   }
    // })//dateOfFinishAscending

    // data = data.sort((a: any, b: any) => {

    //   const first = a?.dateOfFinish
    //   const second = b?.dateOfFinish

    //   if (!first || !second) {
    //     return 0
    //   } else {
    //     return parseFloat(second) - parseFloat(first)
    //   }
    // })//dateOfFinishDescending

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


      <div className="flex bg-blue-200 p-4 my-4 justify-between ">
        <Button label="Add Game" style="primary" onClick={() => navigate('/games/add')} />
        <div className="h-10 grid justify-center">
          <Listbox />
        </div>
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