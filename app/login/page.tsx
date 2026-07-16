"use client";
import { useState, KeyboardEvent } from "react";
import { ArrowBigUpDash, TriangleAlert } from "lucide-react";

function Login() {
  const [capsLockOn, setCapsLockOn] = useState(false);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    setCapsLockOn(event.getModifierState("CapsLock"));
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <div className="flex flex-col bg-white w-full md:w-1/2 rounded-md p-20">
        <h1 className="text-2xl font-bold mb-5">LOG IN</h1>
        <form className="w-full md:w-1/4" action="">
          <h1>User Name: </h1>
          <input
            className="bg-zinc-100 p-2 rounded-md w-full"
            type="text"
            name="user"
          />
          <h1>Password: </h1>
          <div className="relative">
            <input
              className="bg-zinc-100 p-2 rounded-md w-full"
              onKeyUp={handleKeyPress}
              type="password"
              name="password"
            />
            {capsLockOn && (
              <ArrowBigUpDash
                className="absolute right-1 top-1/2 -translate-y-1/2 text-amber-500"
                size={18}
                aria-label="Caps Lock is on"
              />
            )}
          </div>
          <button
            type="submit"
            className="p-2 rounded-md bg-blue-500 text-white w-full mt-3 hover:cursor-pointer"
          >
            Log In
          </button>
        </form>
        <div>
          <h1>
            Don't have an account?{" "}
            <a
              href="/signup"
              className="underline hover:cursor-pointer hover:text-blue-500"
            >
              Sign Up
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
