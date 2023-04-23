import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui/Button";
import { Heading } from "@ui/Heading";
import { InputLabel } from "@ui/InputLabel";
import { Text } from "@ui/Text";
import { makeRequest } from "@utils/axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

type Inputs = {
  title: string;
  cover: string | null
  hours: number | null
  dateOfFinish: string | null
}

export default function AddGameSection() {

  // const { token } = localStorage.getItem('user') ? (JSON.parse(localStorage.getItem('user')!)) : ''
  const token = Cookies.get('accessToken') ?? null

  const navigate = useNavigate()

  const titleRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const hoursRef = useRef<HTMLInputElement>(null);
  const dateOfFinishRef = useRef<HTMLInputElement>(null);

  const [validForm, setValidForm] = useState<string | undefined>('')

  const queryClient = useQueryClient()

  const mutation = useMutation(async (addGame: Inputs) => {
    return await makeRequest.post(`/api/games/add`, addGame,
      { headers: { 'x-access-token': token } }
    )
  }, {
    onSuccess: (game: AxiosResponse<any, any>) => {
      let gameObj = JSON.parse(game.config.data)
      queryClient.setQueryData(['games', game.data.insertId], gameObj)
      queryClient.invalidateQueries(['games'], { exact: true })
    },
  })

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    const fixRef = (ref: React.RefObject<HTMLInputElement>) => (ref?.current?.children[0].children[1].children[0] as HTMLInputElement)?.value

    const inputs: Inputs = {
      title: fixRef(titleRef),
      cover: fixRef(coverRef),
      hours: fixRef(hoursRef) === '' ? 0 : Number(fixRef(hoursRef)),
      dateOfFinish: fixRef(dateOfFinishRef) === '' ? null : fixRef(dateOfFinishRef)
    }

    if (!inputs.title) return setValidForm('Title is required!')

    try {
      mutation.mutate(inputs)
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
            <InputLabel label="Title" type="text" placeholder="Game title" required maxLength={75} />
          </div>
          <div ref={coverRef}>
            <InputLabel label="Cover URL" type="url" placeholder="Game cover URL" maxLength={250} />
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