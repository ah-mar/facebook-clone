import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post";

function Posts({ posts }) {
  const [realtimePosts, setRealTimePosts] = useState();

 

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"));
    getDocs(q).then((snapshot) => setRealTimePosts(snapshot));
  }, []);

  return (
    <div>
      {realtimePosts &&
        realtimePosts.docs.map((post) => (
          <Post key={post.id} data={post.data()} />
        ))}
    </div>
  );
}

export default Posts;

//   const idArr = [];
//   getDocs(q)
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//         idArr.push({ id: doc.id, data: doc.data() });
//       });
//     })
//     .catch((error) => console.error(error));

//   useEffect(() => {
//     console.log(idArr);
//   });

//  <div>
//    <div>
//      {error && <strong>Error: {JSON.stringify(error)}</strong>}
//      {loading && <span>Collection: Loading...</span>}
//      {value && (
//        <div>
//          Collection:{" "}
//          {value.docs.map((doc) => (
//            <div key={doc.id}>{JSON.stringify(doc.data())}, </div>
//          ))}
//        </div>
//      )}
//    </div>
//  </div>;
