import { useState, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { XCircle } from '@phosphor-icons/react'

type ErrorProps = {
  message: string
}

export default function Error({ message }: ErrorProps) {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="">
        <div className="flex items-center justify-center bg-red-500 rounded-lg p-4">
          <div className="mr-2">
            <XCircle className="h-5 w-5 text-white" />
          </div>
          <div className="text-white font-medium">{message}</div>
        </div>
      </div>
    </Transition>
  )
}
