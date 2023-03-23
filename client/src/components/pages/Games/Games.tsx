import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "@utils/axios"
import { GamesNav } from "@components/GamesNav"
import { GamesGrid } from "@components/GamesGrid"


export default function Games() {

  const [selectedOption, setSelectedOption] = useState<any>(null)

  const { isLoading, error, data } = useQuery(['games'], async () => {

    const games = await makeRequest.get('/api/games/all')

    let data = games.data

    return data
  })

  let sortedGames: Array<object> = data ? selectedOption?.fn(data) : []

  return (

    <div className="">

      <GamesNav selectedOption={setSelectedOption} />

      <GamesGrid error={error} isLoading={isLoading} sortedGames={sortedGames} />

    </div >
  )
}
