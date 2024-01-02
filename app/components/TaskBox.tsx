"use client";

//react
import { useState } from "react";

//types
import { Task } from "@/config/types";

//icons
import { FaTrash } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";

export default function TaskBox({
  id,
  title,
  status,
  createdAt,
  updatedAt,
}: Omit<Task, "author">) {
  const [checked, setChecked] = useState(status === "Complete" ? true : false);
  return (
    <div className="w-full p-3 flex items-center justify-between gap-4 bg-white rounded-md">
      <div className="w-full flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="w-6 h-6 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
        />
        <div className="flex flex-col justify-center">
          <span className={`font-medium ${checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>{title}</span>
          <span className="text-xs text-gray-500">
            Created: {createdAt} {updatedAt && `| Updated: ${updatedAt}`}
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        <button
          type="button"
          className="bg-gray-200 p-2 rounded-md text-gray-700 hover:text-red-500"
        >
          <FaTrash />
        </button>
        <button
          type="button"
          className="bg-gray-200 p-2 rounded-md text-gray-700 hover:text-indigo-600"
        >
          <MdModeEdit />
        </button>
      </div>
    </div>
  );
}
