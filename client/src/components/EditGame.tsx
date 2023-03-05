import { useParams } from "react-router-dom";
import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../utils/axios";
import { useQuery } from "@tanstack/react-query";

export default function EditGame() {

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


  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<any> => {

    e.preventDefault()

    const inputs = {
      title: titleRef?.current?.value,
      cover: coverRef?.current?.value,
      hours: hoursRef?.current?.value,
      date: dateRef?.current?.value,
      platform: platformRef?.current?.value,
      link: linkRef?.current?.value
    }

    if (!inputs?.title) return

    try {

      await makeRequest.put(`/api/games/edit/${id}`, inputs)
      navigate('/games')

    } catch (error: any) {

      throw new Error(error);
    }
  }

  if (isLoading) return <div>Loading...</div> //EDIT

  if (data?.length < 1 || error) return <div>INVALID</div> //EDIT

  return (

    <div className="flex flex-col items-center    bg-red-100 h-screen">

      <h1 className="mt-4">EditGame {id}</h1>

      <div className=" grid gap-1 grid-cols-1 w-64 mt-4" >

        <form action="submit" >
          <input type="text" ref={titleRef} placeholder="title" required defaultValue={data && data[0]?.title} />
          <input type="text" ref={coverRef} placeholder="cover" defaultValue={data && data[0]?.cover} />
          <input type="number" ref={hoursRef} placeholder="hours" defaultValue={data && data[0]?.hours} />
          <input type="date" ref={dateRef} placeholder="date" defaultValue={data && data[0]?.date} />
          <input type="text" ref={platformRef} placeholder="platform" defaultValue={data && data[0]?.platform} />
          <input type="text" ref={linkRef} placeholder="link" defaultValue={data && data[0]?.link} />

          <button className="bg-blue-100" onClick={handleClick}>add</button>
        </form>

      </div>
    </div>
  )
}

