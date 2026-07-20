"use client";
import { useState, KeyboardEvent, FormEvent } from "react";
import { ArrowBigUpDash, TriangleAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function Login() {
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { logIn } = useAuth();
  const router = useRouter();

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    setCapsLockOn(event.getModifierState("CapsLock"));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await logIn(email, password);
      router.push("/");
    } catch (error: any) {
      setError(mapFirebaseError(error.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <div className="flex flex-col bg-white w-full md:w-1/2 rounded-md p-20">
        <h1 className="text-2xl font-bold mb-5">LOG IN</h1>
        <form className="w-full md:w-1/4" action="" onSubmit={handleSubmit}>
          <h1>User Name: </h1>
          {error && <h1 className="text-red-500 font-bold">{error}</h1>}
          <input
            className="bg-zinc-100 p-2 rounded-md w-full"
            type="email"
            data-testid="email-input"
            value={email}
            required
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <h1>Password: </h1>
          <div className="relative">
            <input
              className="bg-zinc-100 p-2 rounded-md w-full"
              onKeyUp={handleKeyPress}
              type="password"
              data-testid="password-input"
              value={password}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
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
            data-testid="login-button"
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

function mapFirebaseError(code: string): string {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default Login;
