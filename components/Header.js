import Image from "next/image";
import fb_logo from "../public/fb_logo.webp";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session, status } = useSession();
  console.log("Header session is", session, status)

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:px-5 shadow-md">
      {/* Left */}
      <div className="flex items-center">
        <Image
          src={fb_logo}
          alt="fb-logo"
          width={40}
          height={40}
          layout="fixed"
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-200 p-2">
          <SearchIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="search-facebook"
            className="hidden md:flex flex-shrink items-center ml-2 bg-transparent outline-none placeholder-gray-500 "
          />
        </div>
      </div>

      {/* Center */}
      <div className="flex justify-center flex-grow">
        <div className="flex gap-6 md:gap-2">
          <HeaderIcon Icon={HomeIcon} active />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>
      {/* Right */}
      <div className="flex items-center sm: space-x-2 justify-end">
        {/* Profile pic */}
        {session && <Image
          className="rounded-full cursor-pointer"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
          onClick={() => signOut()}
          alt="user profile pic"
        />}
        <p className="font-semibold whitespace-nowrap">{session?.user?.name}</p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  );
}

export default Header;
