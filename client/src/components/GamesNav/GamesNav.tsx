import { useNavigate } from "react-router"
import { sortArray } from '@utils/sortGames'
import { Button } from "@ui/Button"
import { ListBox } from "@ui/ListBox"
import { Funnel } from "@phosphor-icons/react"

type GamesNavProps = {
  selectedOption: React.Dispatch<React.SetStateAction<{}>>
}


export default function GamesNav({ selectedOption }: GamesNavProps) {

  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-2 gap-4 bg-blue-200 p-4 my-4">
      <Button label="Add Game" style="primary" onClick={() => navigate('/games/add')} />

      {/* +768px */}
      <div className="h-10 grid justify-end tablet:hidden">
        <ListBox className="bg-white " optionsArray={sortArray as any} selectedOption={selectedOption} />
      </div>

      {/* -768px */}
      <div className="h-10 grid justify-end md:hidden">
        <ListBox className="bg-white justify-self-end w-16" optionsArray={sortArray as any} selectedOption={selectedOption}
          menuIcon={<Funnel size={20} color="black" weight="fill" />}
        />
      </div>
    </div>
  )
}