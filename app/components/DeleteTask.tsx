"use client";

//react
import { Dispatch, SetStateAction } from "react";

//react icons
import { IoClose } from "react-icons/io5";

//actions
import { deleteTask } from "../actions/tasks";

type DeleteTaskProps = {
  id: number;
  showDeleteTask: boolean;
  setShowDeleteTask: Dispatch<SetStateAction<boolean>>;
};

export default function DeleteTask({
  id,
  showDeleteTask,
  setShowDeleteTask,
}: DeleteTaskProps) {

  async function deleteSelectedTask() {
    await deleteTask(id);
    setShowDeleteTask(false);
  }

  return (
    <>
      { //Show delete modal when delete button clicked
        showDeleteTask ? (
        <>
          <div
            onClick={() => setShowDeleteTask(false)}
            className="fixed z-30 top-0 left-0 flex justify-center items-center w-full h-[100dvh] bg-black/50"
          />

          <div className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm bg-indigo-50 rounded-lg p-5 space-y-3">
            <h2 className="text-xl font-semibold text-gray-600">Delete Task</h2>
            <div className="flex flex-col gap-2 text-sm">
              Are you sure you want to delete the task? This action cant be
              reversed
            </div>
            <div className="w-full flex gap-2">
              <button
                onClick={() => deleteSelectedTask()}
                className="bg-red-500 hover:bg-red-600 active:bg-red-400 disabled:bg-red-300 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium"
              >
                Delete Task
              </button>
              <button
                onClick={() => setShowDeleteTask(false)}
                className="bg-gray-300 hover:bg-gray-400 active:bg-gray-200 transition-colors duration-100 text-gray-600 px-5 py-2 rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
            <div className="absolute -top-16 right-0 h-8 w-full flex justify-end">
              <button
                onClick={() => setShowDeleteTask(false)}
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
