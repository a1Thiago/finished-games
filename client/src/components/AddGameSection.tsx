import { useRef, useState } from "react"
import Heading from "@ui/Heading/Heading";
import Text from "@ui/Text/Text";
import Button from "@ui/Button/Button";
import InputLabel from "@ui/InputLabel/InputLabel";
import { json, useNavigate } from "react-router";
import { makeRequest } from "@utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function AddGameSection() {

  const navigate = useNavigate()

  const titleRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const hoursRef = useRef<HTMLInputElement>(null);
  const dateOfFinishRef = useRef<HTMLInputElement>(null);

  const [validForm, setValidForm] = useState<string | undefined>('')

  const queryClient = useQueryClient()

  const mutation = useMutation(async (addGame) => {
    return await makeRequest.post(`/api/games/add`, addGame)
  }, {
    onSuccess: (game: any) => {
      let gameObj = JSON.parse(game.config.data)
      queryClient.setQueryData(['games', game.data.insertId], gameObj)
      queryClient.invalidateQueries(['games'], { exact: true })
    },
  })

  const handleClick = async (e: any) => {

    e.preventDefault()

    const fixRef = (ref: any) => ref?.current?.children[0].children[1].children[0].value //TODO

    const inputs = {
      title: fixRef(titleRef) as string,
      cover: fixRef(coverRef) as string,
      hours: fixRef(hoursRef) === '' ? 0 : fixRef(hoursRef) as number,
      dateOfFinish: fixRef(dateOfFinishRef) === '' ? null : fixRef(dateOfFinishRef) as string,
    }

    if (!inputs.title) return setValidForm('Title is required!')

    try {
      mutation.mutate(inputs as any)
      navigate('/games')

    } catch (error: any) {
      setValidForm(error.message)
      throw new Error(error);
    }

  }

  return (

    <div className="grid gap-4 bg-white shadow-custom py-8 px-4 max-w-md w-full">

      <form onSubmit={handleClick}>
        <Heading ><h2 className="text-center">Submit a game</h2></Heading>
        <Text className="text-redAlert-100">{validForm}</Text>
        <div className="grid gap-4">
          <div ref={titleRef}>
            <InputLabel label="Title" type="text" placeholder="Game title" required />
          </div>
          <div ref={coverRef}>
            <InputLabel label="Cover URL" type="url" placeholder="Game cover URL" />
          </div>
          <div ref={hoursRef}>
            <InputLabel label="Hours" type="number" placeholder="Game Hours" />
          </div>
          <div ref={dateOfFinishRef}>
            <InputLabel label="Finish date" type="date" placeholder="Game finish date" defaultValue={new Date().toISOString().substring(0, 10)} />
          </div>
        </div>
        <div className="text-center mt-8 flex justify-between gap-4">
          <Button label="Cancel" style="warn" onClick={() => navigate('/games')} />
          <Button label="Submit" style="primary" />
        </div>
      </form>
    </div>

  )
}