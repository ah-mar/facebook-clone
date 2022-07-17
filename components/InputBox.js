import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";

function InputBox() {
  const { data: session, status } = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  async function sendPost(e) {
    e.preventDefault();
    if (!inputRef.current.value) {
      return;
    }
    const data = {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    };
    console.log(data);
    try {
      const docref = await addDoc(collection(db, "posts"), data);
      console.log("Document writted with Docid ->", docref.id);
      if (imageToPost) {
        // upload the image
        const storage = getStorage();
        const filepath = `posts/${docref.id}`;
        console.log("filepath is", filepath);
        const storageRef = ref(storage, `posts/${docref.id}`);
        console.log("storageref is", storageRef);
        //
  
        const snapshot = await uploadString(storageRef, imageToPost, "data_url");
        console.log("snapshot is", snapshot);
        removeImage();
  
        const url = await getDownloadURL(snapshot.ref);
  
        console.log("File available at", url);
        const postRef = doc(db, "posts", docref.id);
        setDoc(postRef, { postImage: url }, { merge: true });
  
        inputRef.current.value = "";
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  function addImageToPost(e) {
    e.preventDefault();
    console.log(e.target.files[0]);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      console.log("reader event", readerEvent.target.result);
      setImageToPost(readerEvent.target.result);
    };
  }

  function removeImage() {
    setImageToPost(null);
  }

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 mt-6">
      <div className="flex gap-4 p-4 items-center">
        {session && (
          <Image
            src={session.user.image}
            width={40}
            height={40}
            layout="fixed"
            alt="user-image"
            className="rounded-full"
          />
        )}
        <form className="flex flex-1">
          <input
            ref={inputRef}
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none "
            type="text"
            placeholder={`What's on your mind, ${session?.user?.name} ?`}
          />
          <button hidden onClick={sendPost} type="submit">
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs xs:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          className="inputIcon"
          onClick={() => filePickerRef.current.click()}
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs xs:text-sm xl:text-base">Feeling/Activity</p>
          <input
            ref={filePickerRef}
            type="file"
            hidden
            onChange={addImageToPost}
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs xs:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
