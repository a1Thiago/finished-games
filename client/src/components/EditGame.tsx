import useFetch from "../utils/useFetch"
import { useParams } from "react-router-dom";
import { useRef } from "react"
import { useNavigate } from "react-router-dom";

export default function EditGame() {

  const { id } = useParams();

  const url = `http://localhost:8000/game/${id}`

  interface Game {
    id: number,
    title: string,
    cover?: string,
    hours?: number,
    date?: string,
    platform?: string,
    link?: string
  }

  const { data, error } = useFetch<Game[]>(url)

  const navigate = useNavigate()

  const titleRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const hoursRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const platformRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);


  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<any> => {

    e.preventDefault()

    const url = `http://localhost:8000/edit/${id}`

    const data = {
      title: titleRef?.current?.value,
      cover: coverRef?.current?.value,
      hours: hoursRef?.current?.value,
      date: dateRef?.current?.value,
      platform: platformRef?.current?.value,
      link: linkRef?.current?.value
    }

    if (!data?.title) return

    try {
      await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
      })
      navigate('/')

    } catch (error) {
      //ERRORRR MSG
    }

  }


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

