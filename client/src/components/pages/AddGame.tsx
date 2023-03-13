import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import { makeRequest } from "@utils/axios";

export default function AddGame() {


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
      date: dateRef?.current?.value === '' ? null : dateRef?.current?.value,
      platform: platformRef?.current?.value,
      link: linkRef?.current?.value
    }

    if (!inputs?.title) return //EDIT

    try {
      await makeRequest.post(`/api/games/add`, inputs)
      navigate('/games')

    } catch (error: any) {

      throw new Error(error);
    }
  }

  return (
    <div className="flex flex-col items-center    bg-red-100 h-screen">
      <h1 className="mt-4">AddGame</h1>

      <div className=" grid gap-1 grid-cols-1 w-64 mt-4" >

        <form action="submit" >
          <input type="text" ref={titleRef} placeholder="title" required />
          <input type="url" ref={coverRef} placeholder="cover" />
          <input type="number" ref={hoursRef} placeholder="hours" defaultValue={0} />
          <input type="date" ref={dateRef} placeholder="date" defaultValue={new Date().toISOString().substring(0, 10)} />
          <input type="text" ref={platformRef} placeholder="platform" />
          <input type="url" ref={linkRef} placeholder="link" />

          <button className="bg-blue-100" onClick={handleClick}>add</button>
        </form>

      </div>
    </div>
  )
}
