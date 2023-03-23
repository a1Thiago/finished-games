import { useNavigate } from "react-router"
import { sortArray } from '@utils/sortGames'
import { Button } from "@ui/Button"
import { ListBox } from "@ui/ListBox"

type GamesNavProps = {
  selectedOption: React.Dispatch<React.SetStateAction<{}>>
}

export default function GamesNav({ selectedOption }: GamesNavProps) {

  const navigate = useNavigate()

  return (
    <div className="flex bg-blue-200 p-4 my-4 justify-between">
      <Button label="Add Game" style="primary" onClick={() => navigate('/games/add')} />
      <div className="h-10 grid justify-center">
        <ListBox optionsArray={sortArray} selectedOption={selectedOption} />
      </div>
    </div>
  )
}