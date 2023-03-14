export default function HomeImages() {



  return (
    <div className="grid grid-cols-2">

      <div className="flex">
        <img src="/frame1.png" alt="" className="translate-x-16 translate-y-8 hover:z-10 hover:scale-110 transition-transform ease-out duration-500" />
      </div>

      <div >
        <img src="/frame2.png" alt="" className="-translate-x-8 translate-y-20 hover:z-10 hover:scale-110 transition-transform ease-out duration-500" />
      </div>

      <div className="flex">
        <img src="/frame3.png" alt="" className="translate-x-8 -translate-y-20 hover:z-10 hover:scale-110 transition-transform ease-out duration-500" />
      </div>

      <div >
        <img src="/frame4.png" alt="" className="-translate-x-16 -translate-y-8 hover:z-10 hover:scale-110 transition-transform ease-out duration-500" />
      </div>

    </div>
  )
}