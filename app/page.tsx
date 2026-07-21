"use client";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (loading || !user) return <p>Loading...</p>;

  console.log(user);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col flex-1 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
        <div className="flex flex-col w-3/4 bg-white p-20 rounded-md">
          <h1 className="font-bold text-2xl mx-auto">To Do List</h1>
          <a href="/login">Login</a>
        </div>
      </main>
    </div>
  );
}
