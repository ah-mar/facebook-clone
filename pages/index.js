import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { db } from "../firebase";
import { query, orderBy, limit, collection, getDocs } from "firebase/firestore";

export default function Home({ session1, posts }) {
  //const { data: session } = useSession();
  console.log("session1 is", session1);

  if (!session1) return <Login />;

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>FB Clone</title>
      </Head>

      {/* Header */}
      <Header />
      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  //Get the user
  const session1 = await getSession(context);

  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("name", "desc"));
  const posts = await getDocs(q);
  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));
  console.log("session1 is", session1);

  return {
    props: {
      session1,
      posts: docs,
    },
  };
}
