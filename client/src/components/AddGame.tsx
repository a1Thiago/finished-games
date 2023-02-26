import { useRef } from "react"
import { useNavigate } from "react-router-dom";

export default function AddGame() {

  const url = 'http://localhost:8000/add'

  const navigate = useNavigate()

  const titleRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const hoursRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const platformRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);


  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<any> => {

    e.preventDefault()

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
        method: 'POST',
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
      <h1 className="mt-4">AddGame</h1>

      <div className=" grid gap-1 grid-cols-1 w-64 mt-4" >

        <form action="submit" >
          <input type="text" ref={titleRef} placeholder="title" required />
          <input type="text" ref={coverRef} placeholder="cover" />
          <input type="number" ref={hoursRef} placeholder="hours" defaultValue={0} />
          <input type="date" ref={dateRef} placeholder="date" />
          <input type="text" ref={platformRef} placeholder="platform" />
          <input type="text" ref={linkRef} placeholder="link" />

          <button className="bg-blue-100" onClick={handleClick}>add</button>
        </form>

      </div>
    </div>
  )
}
