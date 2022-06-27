import Image from "next/image"



function Contact({name, src}) {
  return (
    <div className="flex gap-3 justify-between items-center mb-2 p-2 relative hover:bg-gray-200 cursor-pointer">
    <Image src={src} alt="" height={50} width={50} objectFit="cover" layout="fixed" className="rounded-full"/>
    <p>{name}</p>
    <div className="absolute bottom-2 left-10 bg-green-400 h-3 w-3 rounded-full"></div>
    </div>
  )
}

export default Contact