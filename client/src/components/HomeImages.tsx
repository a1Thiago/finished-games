export default function HomeImages() {


  const animation = 'hover:z-10 hover:scale-110 transition-transform ease-out duration-500'

  return (

    <div className="grid grid-cols-2 translate-x-8 tablet:-translate-x-0">
      <div className="flex">
        <img src="/frame1.png" alt="" className={`translate-x-16 translate-y-8
         ${animation}`} />
      </div>

      <div className="flex">
        <img src="/frame2.png" alt="" className={`-translate-x-8 translate-y-20
         ${animation}`} />
      </div>

      <div className="flex">
        <img src="/frame3.png" alt="" className={`translate-x-8 -translate-y-20
        ${animation}`} />
      </div>

      <div className="flex">
        <img src="/frame4.png" alt="" className={`-translate-x-16 -translate-y-8
        ${animation}`} />
      </div>

    </div>
  )
}