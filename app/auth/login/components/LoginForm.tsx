"use client";

//react
import { useState } from "react";

//actions
import { login } from "@/app/actions/users";
import { useRouter } from "next/navigation";

//icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoginForm() {
  //Login Values
  const [loginValues, setLoginValues] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  //Login handle error & loading state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  async function userLogin() {
    setIsLoading(true);
    const userLogged = await login(loginValues.username, loginValues.password);
    if (userLogged.length === 0) {
      setError(true);
      setIsLoading(false);
      return;
    }
    setError(false);
    localStorage.setItem("user", loginValues.username);
    router.push("/", { scroll: false });
  }

  return (
    <form>
      <div className="flex flex-col gap-2">
        <span className="text-sm text-gray-500 font-medium">Username</span>
        <input
          onChange={(e) =>
            setLoginValues({ ...loginValues, username: e.target.value })
          }
          type="text"
          className="h-10 p-2"
        />
        {loginValues.username.length < 2 && (
          <span className="text-xs text-red-500 font-medium">
            Username must be 2 characters or more
          </span>
        )}
        <span className="text-sm text-gray-500 font-medium">Password</span>
        <input
          onChange={(e) =>
            setLoginValues({ ...loginValues, password: e.target.value })
          }
          type="password"
          className="h-10 p-2"
        />
        {loginValues.password.length < 8 && (
          <span className="text-xs text-red-500 font-medium">
            Password must have at least 8 characters
          </span>
        )}
      </div>
      <div className="w-full flex flex-col gap-2 mt-4 mb-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            userLogin();
          }}
          disabled={
            loginValues.username.length < 2 || loginValues.password.length < 8
          }
          className="w-full flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 disabled:bg-indigo-300 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" />
          ) : (
            "Login"
          )}
        </button>
        {error && (
          <span className="text-xs text-red-500 font-medium text-center">
            Invalid username or password
          </span>
        )}
      </div>
    </form>
  );
}
