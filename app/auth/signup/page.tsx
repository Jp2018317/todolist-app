//next
import Link from "next/link";

import SignupForm from "./components/SignupForm";

export default async function Page() {
    return (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-indigo-50 rounded-lg p-5 space-y-6">
          <h2 className="text-xl font-semibold text-gray-600 text-center">Signup</h2>
          <SignupForm />
          <span className="w-full text-xs font-medium mt-4">
            Already have an account ? <Link href="login" className="text-indigo-700 hover:text-indigo-400 underline underline-offset-4">Login!</Link>
          </span>
        </div>
    );
  }