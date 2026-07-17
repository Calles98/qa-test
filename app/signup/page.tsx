"use client";
import { useState, KeyboardEvent, FormEvent } from "react";
import { ArrowBigUpDash, TriangleAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

function SignUp() {
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    setCapsLockOn(event.getModifierState("CapsLock"));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signUp(email, password);
      router.push("/login");
      console.log("Sign Up Successful");
    } catch (err: any) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <div className="flex flex-col bg-white w-full md:w-1/2 rounded-md p-20">
        <h1 className="text-2xl font-bold mb-5">SIGN UP</h1>
        {error && <p className="text-red-500 font-bold">{error}</p>}
        <form className="w-full md:w-1/4" onSubmit={handleSubmit}>
          <h1>Email: </h1>
          <input
            className="bg-zinc-100 p-2 rounded-md w-full"
            data-testid="email-input"
            type="email"
            value={email}
            placeholder="example@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <h1>Password: </h1>
          <div className="relative">
            <input
              className="bg-zinc-100 p-2 rounded-md w-full"
              onKeyUp={handleKeyPress}
              data-testid="password-input"
              type="password"
              value={password}
              placeholder="Password"
              required
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
            name="signup-button"
            data-testid="signup-button"
            className="p-2 rounded-md bg-blue-500 text-white w-full mt-3 hover:cursor-pointer"
          >
            Sign Up
          </button>
        </form>
        <div>
          <h1>
            Already have an account?{" "}
            <a
              href="/login"
              className="underline hover:cursor-pointer hover:text-blue-500"
            >
              Log In
            </a>
          </h1>
        </div>
      </div>
    </div>
  );
}

function mapFirebaseError(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "That email is already registered.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    default:
      return "Something went wrong. Please try again.";
  }
}

export default SignUp;
