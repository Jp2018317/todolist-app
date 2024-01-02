"use client";

//react
import { useState } from "react";

//types
import { Task } from "@/config/types";

//icons
import { FaTrash } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";

//actions
import { deleteTask, updateTask } from "../actions/tasks";

//modals
import EditTask from "./EditTask";

//shadcn
//shadcn
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function TaskBox({
  id,
  title,
  status,
  createdAt,
  updatedAt,
}: Omit<Task, "author">) {
  const [checked, setChecked] = useState(status === "Complete" ? true : false);

  //Delete & Update Modal
  const [showEditTask, setShowEditTask] = useState(false);

  async function deleteSelectedTask() {
    await deleteTask(id);
  }

  async function updateStatus() {
    await updateTask({
      id: id,
      title: title,
      status: checked ? "Incomplete" : "Complete",
    });
  }

  return (
    <div className="w-full p-3 flex items-center justify-between gap-4 bg-white rounded-md">
      <div className="w-full flex items-center gap-3">
        <input
          onChangeCapture={() => updateStatus()}
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="sm:w-6 w-4 sm:h-6 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
        />
        <div className="flex flex-col justify-center">
          <span
            className={`font-medium max-sm:text-sm ${
              checked ? "line-through text-gray-400" : "text-gray-700"
            }`}
          >
            {title}
          </span>
          <span className="text-xs max-sm:text-[10px] text-gray-500">
            Created: {createdAt} {updatedAt && `| Updated: ${updatedAt}`}
          </span>
        </div>
      </div>
      <div className="flex max-xs:flex-col justify-center items-center gap-3">
        
      <AlertDialog>
        <AlertDialogTrigger className="bg-gray-200 p-2 rounded-md text-gray-700 hover:text-red-500"><FaTrash /></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteSelectedTask()} className="bg-red-500 hover:bg-red-600 active:bg-red-500">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <button
          onClick={() => setShowEditTask(true)}
          type="button"
          className="bg-gray-200 p-2 rounded-md text-gray-700 hover:text-indigo-600"
        >
          <MdModeEdit />
        </button>
      </div>
      { //Show Update Modal on Update button clicked
        showEditTask && (
        <EditTask
          id={id}
          showEditTask={showEditTask}
          setShowEditTask={setShowEditTask}
        />
      )}
    </div>
  );
}
