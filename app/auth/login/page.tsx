//next
import Link from "next/link";

import LoginForm from "./components/LoginForm";

export default async function Page() {
    return (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-indigo-50 rounded-lg p-5 space-y-6">
          <h2 className="text-xl font-semibold text-gray-600 text-center">Login</h2>
          <LoginForm />
          <span className="w-full text-xs font-medium mt-4">
            Dont have an account yet ? <Link href="signup" className="text-indigo-700 hover:text-indigo-400 underline underline-offset-4">Sing up free!</Link>
          </span>
        </div>
    );
  }