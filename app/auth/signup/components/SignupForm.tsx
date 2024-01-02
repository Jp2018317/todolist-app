"use client";

//actions
import { getUser, signup } from "@/app/actions/users";
import { useRouter } from "next/navigation";

//react
import { useState } from "react";

export default function SignupForm() {
  //Login Values
  const [signupValues, setSignupValues] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  //Login handle error
  const [error, setError] = useState(false);

  const router = useRouter();

  async function userSignup(){
    const userExist = await getUser(signupValues.username);
    if(userExist.length === 0){
      await signup(signupValues.username, signupValues.password);
      localStorage.setItem("user", signupValues.username);
      router.push("/", { scroll: false });
      return;
    };
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
          onClick={(e) => {e.preventDefault(); userSignup()}}
          disabled={
            signupValues.username.length < 2 || signupValues.password.length < 8
          }
          className="w-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 disabled:bg-indigo-300 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium"
        >
          Signup
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
