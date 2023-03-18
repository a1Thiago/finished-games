import { useRef, useState } from "react"
import Heading from "@ui/Heading/Heading";
import Text from "@ui/Text/Text";
import Button from "@ui/Button/Button";
import InputLabel from "@ui/InputLabel/InputLabel";
import { useNavigate, useParams } from "react-router";
import { makeRequest } from "@utils/axios";
import { useQuery } from "@tanstack/react-query";

export default function AddGameSection() {


  const { id } = useParams();

  const { isLoading, error, data } = useQuery(['singleGame'], async () => {
    const game = await makeRequest.get(`/api/games/${id}`)
    return game.data
  })

  const navigate = useNavigate()

  const titleRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const hoursRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const platformRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const [validForm, setValidForm] = useState<string | undefined>('')


  const handleClick = async (e: any) => {

    e.preventDefault()

    const fixRef = (ref: any) => ref?.current?.children[0].children[1].children[0].value //TODO

    const inputs = {
      title: fixRef(titleRef) as string,
      cover: fixRef(coverRef) as string,
      hours: fixRef(hoursRef) === '' ? 0 : fixRef(hoursRef) as number,
      date: fixRef(dateRef) === '' ? null : fixRef(dateRef) as string,
      platform: fixRef(platformRef) as string,
      link: fixRef(linkRef) as string,
    }

    if (!inputs.title) return setValidForm('Title is required!')

    try {
      await makeRequest.put(`/api/games/edit/${id}`, inputs)
      navigate('/games')

    } catch (error: any) {
      setValidForm(error.message)
      throw new Error(error);
    }
  }


  // if (isLoading) return <div>Loading...</div> //EDIT

  // if (data?.length < 1 || error) return <div>INVALID</div> //EDIT

  return (

    <div className="grid gap-4 bg-white shadow-custom py-8 px-4 max-w-md w-full">

      <form onSubmit={handleClick}>
        <Heading ><h2 className="text-center">Edit Game {id}</h2></Heading>
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
          <div ref={dateRef}>
            <InputLabel label="Finish date" type="date" placeholder="Game finish date" defaultValue={data && data[0]?.date.substring(0, 10)} />
          </div>
          <div ref={platformRef}>
            <InputLabel label="Platform" type="text" placeholder="Game platform" defaultValue={data && data[0]?.platform} />
          </div>
          <div ref={linkRef}>
            <InputLabel label="Storefront URL" type="url" placeholder="Game storefront URL" defaultValue={data && data[0]?.link} />
          </div>
        </div>
        <div className="text-center mt-8 flex justify-between gap-4">
          <Button label="Cancel" style="warn" />
          <Button label="Submit" style="primary" />
        </div>
      </form>
    </div>

  )
}