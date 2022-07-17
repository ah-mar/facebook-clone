import { signIn } from "next-auth/react";
import Image from "next/image";
import fb_logo from "../public/fb_logo.webp";


function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-screen">
      <Image
        src={fb_logo}
        height={200}
        width={200}
        objectFit="contain"
        alt="fb-logo"
      />
     
      <button
        className="px-6 py-4 bg-blue-500 rounded-full text-white text-center cursor-pointer"
        onClick={() => signIn()}
      >
        Login with Facebook
      </button>
    </div>
  );
}

export default Login;
