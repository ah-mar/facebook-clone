import { signIn } from "next-auth/react";
import Image from "next/image";
import fb_logo from "../public/fb_logo.webp";


function Login() {
  return (
    <div className="grid place-items-center">
      <Image
        src={fb_logo}
        height={400}
        width={400}
        objectFit="contain"
        alt="fb-logo"
      />
     
      <button
        className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer"
        onClick={() => signIn()}
      >
        Login with Facebook
      </button>
    </div>
  );
}

export default Login;
