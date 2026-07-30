"use client";
import Header from "@/components/Header";
import TodoCard from "@/components/TodoCard";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface Todo {
  id: string;
  title: string;
  body: string;
  completed: boolean;
}

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (!user) return;

    const q = query(
      collection(db, "todos"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Todo[];
      setTodos(items);
    });

    return unsubscribe;
  }, [user, loading, router]);

  if (loading || !user) return <p>Loading...</p>;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() && !body.trim()) return;

    try {
      await addDoc(collection(db, "todos"), {
        title,
        body,
        userId: user.uid,
        completed: false,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setBody("");
      console.log("Successfully Added Document");
    } catch (error) {
      console.error("error adding document", error);
      setError("Error adding new note.");
    }
  };

  console.log(todos);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
        <div className="flex flex-col w-full md:w-3/4 bg-white p-20 rounded-md">
          <h1 className="font-bold text-xl mx-auto">Add a new to do</h1>
          {error && <h1 className="font-bold text-red-500">{error}</h1>}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row justify-center w-full mb-5"
          >
            <div className="flex flex-col w-full md:w-1/2 mr-2 rounded-md overflow-hidden ">
              <input
                placeholder="title"
                className="p-2 bg-zinc-100 w-full outline-0"
                type="text"
                data-testid="title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="body"
                data-testid="body-input"
                className="p-2 bg-zinc-100 w-full outline-0"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <button
              className="p-2 bg-blue-500 font-bold text-white rounded-md hover:cursor-pointer"
              type="submit"
              data-testid="submit-button"
            >
              Add
            </button>
          </form>
          <h1 className="font-extrabold text-2xl mx-auto">To Do List</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {todos.length ? (
              todos.map((todo, index) => <TodoCard key={index} todo={todo} />)
            ) : (
              <h2 className="mx-auto text-lg">List is empty...</h2>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
