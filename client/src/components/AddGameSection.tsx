import { useRef, useState } from "react"
import Heading from "@ui/Heading/Heading";
import Text from "@ui/Text/Text";
import Button from "@ui/Button/Button";
import InputLabel from "@ui/InputLabel/InputLabel";
import { useNavigate } from "react-router";
import { makeRequest } from "@utils/axios";

export default function AddGameSection() {

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

    console.log(inputs)

    if (!inputs.title) return setValidForm('Title is required!')

    try {
      await makeRequest.post(`/api/games/add`, inputs)
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
          <div ref={dateRef}>
            <InputLabel label="Finish date" type="date" placeholder="Game finish date" defaultValue={new Date().toISOString().substring(0, 10)} />
          </div>
          <div ref={platformRef}>
            <InputLabel label="Platform" type="text" placeholder="Game platform" />
          </div>
          <div ref={linkRef}>
            <InputLabel label="Storefront URL" type="url" placeholder="Game storefront URL" />
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