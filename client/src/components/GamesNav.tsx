import Button from "@ui/Button/Button"
import Listbox from "@ui/ListBox/ListBox"
import { sortArray } from '@utils/sortGames'
import { useNavigate } from "react-router"

type GamesNavProps = {
  selectedOption: React.Dispatch<React.SetStateAction<{}>>
}

export default function GamesNav({ selectedOption }: GamesNavProps) {

  const navigate = useNavigate()

  return (
    <div className="flex bg-blue-200 p-4 my-4 justify-between ">
      <Button label="Add Game" style="primary" onClick={() => navigate('/games/add')} />
      <div className="h-10 grid justify-center">
        <Listbox optionsArray={sortArray} selectedOption={selectedOption} />
      </div>
    </div>
  )
}