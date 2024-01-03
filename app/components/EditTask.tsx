"use client";

//react
import { Dispatch, SetStateAction, useEffect, useState } from "react";

//react icons
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

//actions
import { getTask, updateTask } from "../actions/tasks";
import { statusDropdown } from "@/config/config";

//shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DeleteTaskProps = {
  id: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EditTask({
  id,
  setOpen,
}: DeleteTaskProps) {

  //Loading state
  const [isLoading, setIsLoading] = useState(true);

  //Edit Task form values
  const [taskValue, setTaskValue] = useState<{
    title: string;
    status: "Complete" | "Incomplete";
  }>({ title: "", status: "Incomplete" });

  async function editTask() {
    await updateTask({
      id: id,
      title: taskValue.title,
      status: taskValue.status,
    });
    setOpen(false);
  }

  //Get the task selected from the database
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskById = await getTask(id);
        setTaskValue({ title: taskById[0].title, status: taskById[0].status });
        setIsLoading(false);
      } catch (error) {
        setTaskValue({ title: "", status: "Incomplete" });
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center py-14">
          <AiOutlineLoading3Quarters className="animate-spin text-indigo-500 w-8 h-8" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-500 font-medium">Title</span>
          <input
            defaultValue={taskValue.title}
            onChange={(e) =>
              setTaskValue({ ...taskValue, title: e.target.value })
            }
            type="text"
            className="h-10 px-3 py-2 rounded-md"
          />
          {taskValue.title.length < 3 && (
            <span className="text-xs text-red-500 font-medium">
              Title must have more than 3 characters
            </span>
          )}
          <span className="text-sm text-gray-500 font-medium">Status</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full bg-white flex justify-between items-center gap-x-8 px-3 py-2 rounded-md font-medium">
              <div>{taskValue.status}</div>
              <FaAngleDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statusDropdown.map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => {
                    setTaskValue({
                      ...taskValue,
                      status: status === "Complete" ? "Complete" : "Incomplete",
                    });
                  }}
                  className="w-full hover:bg-indigo-100 active:bg-indigo-200 border-b border-indigo-200 text-left gap-x-2 px-4 py-1.5 font-medium"
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <div className="w-full flex gap-2">
        <button
          onClick={() => editTask()}
          disabled={taskValue.title.length < 3}
          className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 disabled:bg-indigo-300 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium"
        >
          Edit Task
        </button>
        <button
          onClick={() => {
            setOpen(false);
          }}
          className="bg-gray-300 hover:bg-gray-400 active:bg-gray-200 transition-colors duration-100 text-gray-600 px-5 py-2 rounded-md font-medium"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
