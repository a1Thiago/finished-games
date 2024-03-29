import { useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

type ListBoxProps = {
  optionsArray: Array<{
    id: number
    option: string
    fn?: (data: []) => []
    onClick?: () => void
  }>,
  className?: string,
  selectedOption?: React.Dispatch<React.SetStateAction<{}>>,
  menuIcon?: any
}

export default function ListBox({ optionsArray, className, selectedOption, menuIcon }: ListBoxProps) {

  const [selected, setSelected] = useState(optionsArray[0])

  useEffect(() => {
    selectedOption && selectedOption(selected)
  }, [])

  return (
    <Listbox value={selected} onChange={(e) => { setSelected(e); selectedOption && selectedOption(e) }} >
      <Listbox.Button className={`inline-flex justify-center px-4 py-2 rounded-t font-semibold 
      text-blue-700  ring-1 ring-inset ring-blue-700 hover:opacity-90 `+ className}>
        {menuIcon || selected?.option}
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options className="text-xs grid gap-2 px-4 justify-center py-2 font-semibold rounded-b bg-blue-500">
          {optionsArray?.map((option) => (
            <Listbox.Option
              onClick={option.onClick}
              key={option?.id}
              value={option}
              className="cursor-pointer grid justify-center py-1
             text-white  bg-blue-500 hover:bg-blue-450 hover:text-opacity-90">
              {option.option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  )
}
