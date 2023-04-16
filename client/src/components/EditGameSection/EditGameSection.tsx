import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@ui/Button";
import { Heading } from "@ui/Heading";
import { InputLabel } from "@ui/InputLabel";
import { Text } from "@ui/Text";
import { makeRequest } from "@utils/axios";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";


export default function AddGameSection() {

  const { token } = localStorage.getItem('user') ? (JSON.parse(localStorage.getItem('user')!)) : ''

  const { id } = useParams();

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery(['games', parseInt(id!)], async () => {
    const game = await makeRequest.get(`/api/games/${id}`,
      { headers: { 'x-access-token': token } }
    )
    return game.data
  })

  const mutation = useMutation(async (editGame) => {
    return await makeRequest.put(`/api/games/edit/${id}`, editGame,
      { headers: { 'x-access-token': token } }
    )
  }, {
    onSuccess: async (game) => {
      let gameObj = await JSON.parse(game.config.data)
      queryClient.setQueryData(['games', parseInt(id!)], gameObj)
      queryClient.invalidateQueries(['games'], { exact: true })
    },
  })

  const titleRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const hoursRef = useRef<HTMLInputElement>(null);
  const dateOfFinishRef = useRef<HTMLInputElement>(null);

  const [validForm, setValidForm] = useState<string | undefined>('')

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


  // if (error) return <p>There is an error.</p>
  // if (!data) return <p>Loading...</p>

  return (

    <div className="grid gap-4 bg-white shadow-custom py-8 px-4 max-w-md w-full">

      <form onSubmit={handleClick} className=" overflow-hidden whitespace-nowrap text-ellipsis">
        <Heading ><h2 className="text-center">Edit {data && data[0]?.title}</h2></Heading>
        <Text className="text-redAlert-100">{validForm}</Text>
        <div className="grid gap-4">
          <div ref={titleRef}>
            <InputLabel label="Title" type="text" placeholder="Game title" required defaultValue={data && data[0]?.title} />
          </div>
          <div ref={coverRef}>
            <InputLabel label="Cover URL" type="url" placeholder="Game cover URL" defaultValue={data && data[0]?.cover} />
          </div>
          <div ref={hoursRef}>
            <InputLabel label="Hours" type="number" placeholder="Game Hours" defaultValue={data && data[0]?.hours} />
          </div>
          <div ref={dateOfFinishRef}>
            <InputLabel label="Finish date" type="date" placeholder="Game finish date" defaultValue={data && data[0]?.dateOfFinish?.substring(0, 10)} />
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