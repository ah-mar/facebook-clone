import Image from "next/image";

Image;

function SidebarRow({ src, Icon, title }) {
  return (
    <div className=" flex items-end space-x-4 p-4 hover:bg-gray-200 rounded-xl cursor-pointer">
      {src && (
        <Image
          src={src}
          height={40}
          width={40}
          layout="fixed"
          alt="user-profile-pic"
          className="rounded-full"
        />
      )}
      {Icon && (
        <div>
          <Icon className="h-8 w-8 text-blue-500" />
        </div>
      )}
      <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  );
}

export default SidebarRow;
