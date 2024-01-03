"use client";

//next
import Link from "next/link";

export default function AuthView() {
  return (
    
    <div className="w-full max-h-[512px] overflow-y-auto flex flex-col space-y-4 items-center justify-center bg-indigo-50 rounded-lg mt-1.5 p-6">
    <h2 className="w-full text-center font-semibold text-lg text-gray-600 my-2">
      {" "}
      Login or signup to have your own ToDo list!{" "}
    </h2>
    <div className="flex gap-x-4">
      <Link
        href="/auth/login"
        className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 disabled:bg-indigo-300 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium"
      >
        Login
      </Link>
      <Link
        href="/auth/signup"
        className="border border-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 disabled:bg-indigo-300 transition-colors duration-100 hover:text-white px-5 py-2 rounded-md font-medium"
      >
        Singup
      </Link>
    </div>
  </div>
  );
}
