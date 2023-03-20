import { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]

export default function ListBox() {

  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson}>

      <Listbox.Button className="inline-flex justify-center px-4 py-2 rounded-t font-semibold 
      bg-white text-blue-700  ring-1 ring-inset ring-blue-700 hover:opacity-95">
        {selectedPerson.name}
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Listbox.Options
          className="grid gap-2 justify-center py-2 font-semibold rounded-b
         bg-blue-500"
        >
          {people.map((person) => (
            <Listbox.Option
              key={person.id}
              value={person}
              disabled={person.unavailable}
              className="cursor-pointer grid justify-center py-1
             text-white  bg-blue-500 hover:bg-blue-450"
            >
              {person.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  )
}