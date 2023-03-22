import Button from "@ui/Button/Button"
import Listbox from "@ui/ListBox/ListBox"
import { sortArray } from '@utils/sortGames'
import { useState } from "react"
import { useNavigate } from "react-router"

export default function GamesNav({ }) {

  const navigate = useNavigate()

  const [selectedOption, setSelectedOption] = useState<any>(null)

  return (
    <div className="flex bg-blue-200 p-4 my-4 justify-between ">
      <Button label="Add Game" style="primary" onClick={() => navigate('/games/add')} />
      <div className="h-10 grid justify-center">
        <Listbox optionsArray={sortArray} selectedOption={setSelectedOption} />
      </div>
    </div>
  )
}