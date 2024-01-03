"use client";

//react
import { useState } from "react";

//actions
import { getUser, signup } from "@/app/actions/users";
import { useRouter } from "next/navigation";

//icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SignupForm() {
  //Login Values
  const [signupValues, setSignupValues] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  //Login handle error & loading state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  async function userSignup() {
    setIsLoading(true);
    const userExist = await getUser(signupValues.username);
    if (userExist.length === 0) {
      await signup(signupValues.username, signupValues.password);
      localStorage.setItem("user", signupValues.username);
      router.push("/", { scroll: false });
      return;
    }
    setIsLoading(false);
    setError(true);
  }

  return (
    <form>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500 font-medium">Username</span>
        <input
          onChange={(e) =>
            setSignupValues({ ...signupValues, username: e.target.value })
          }
          type="text"
          className="h-10 p-2"
        />
        {signupValues.username.length < 2 && (
          <span className="text-xs text-red-500 font-medium">
            Username must be 2 characters or more
          </span>
        )}
        <span className="text-sm text-gray-500 font-medium">Password</span>
        <input
          onChange={(e) =>
            setSignupValues({ ...signupValues, password: e.target.value })
          }
          type="password"
          className="h-10 p-2"
        />
        {signupValues.password.length < 8 && (
          <span className="text-xs text-red-500 font-medium">
            Password must have at least 8 characters
          </span>
        )}
      </div>
      <div className="w-full flex flex-col gap-2 mt-4 mb-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            userSignup();
          }}
          disabled={
            signupValues.username.length < 2 || signupValues.password.length < 8
          }
          className="w-full flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 disabled:bg-indigo-300 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" />
          ) : (
            "Signup"
          )}
        </button>
        {error && (
          <span className="text-xs text-red-500 font-medium text-center">
            Username already taken
          </span>
        )}
      </div>
    </form>
  );
}
