"use client";

//react
import { useState } from "react";

//react icons
import { IoClose } from "react-icons/io5";

export default function AddTask() {
  const [addTask, setAddTask] = useState(false);

  async function newTask() {
    console.log("añadir task");
    setAddTask(false);
  }

  return (
    <>
      <div className="w-full flex justify-between">
        <button
          onClick={() => setAddTask(true)}
          className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium"
        >
          Add Task
        </button>
        <button className="bg-gray-300 px-5 py-2 rounded-md font-medium">
          ALL
        </button>
      </div>
      {addTask ? (
        <>
          <div
            onClick={() => setAddTask(false)}
            className="absolute z-30 top-0 left-0 flex justify-center items-center w-full h-[100dvh] bg-black/50"
          />

          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-indigo-50 rounded-lg p-5 space-y-6">
            <h2 className="text-xl font-semibold text-gray-600">Add Task</h2>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500 font-medium">Title</span>
              <input type="text" className="h-10" />
              <span className="text-sm text-gray-500 font-medium">Status</span>
              <input type="text" className="h-10" />
            </div>
            <div className="w-full flex gap-2">
              <button
                onClick={() => newTask()}
                className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium"
              >
                Add Task
              </button>
              <button
                onClick={() => setAddTask(false)}
                className="bg-gray-300 hover:bg-gray-400 active:bg-gray-200 transition-colors duration-100 text-gray-600 px-5 py-2 rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
            <div className="absolute -top-16 right-0 h-8 w-full flex justify-end">
              <button
                onClick={() => setAddTask(false)}
                className="w-8 h-full bg-gray-100 p-0 flex justify-center items-center rounded-md"
              >
                <IoClose className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
