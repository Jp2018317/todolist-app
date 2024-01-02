"use client";

//react
import { Dispatch, SetStateAction, useEffect, useState } from "react";

//react icons
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";

//actions
import { getTask, updateTask } from "../actions/tasks";
import { statusDropdown } from "@/config/config";

//types

type DeleteTaskProps = {
  id: number;
  showEditTask: boolean;
  setShowEditTask: Dispatch<SetStateAction<boolean>>;
};

export default function EditTask({
  id,
  showEditTask,
  setShowEditTask,
}: DeleteTaskProps) {
  //Edit Task Modal
  const [statusFilter, setStatusFilter] = useState(false);
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
    setShowEditTask(false);
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskById = await getTask(id);
        setTaskValue({title: taskById[0].title, status: taskById[0].status});
      } catch (error) {
        setTaskValue({ title: "", status: "Incomplete" });
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      {showEditTask ? (
        <>
          <div
            onClick={() => setShowEditTask(false)}
            className="fixed z-30 top-0 left-0 flex justify-center items-center w-full h-[100dvh] bg-black/50"
          />

          <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-indigo-50 rounded-lg p-5 space-y-6">
            <h2 className="text-xl font-semibold text-gray-600">Edit Task</h2>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-500 font-medium">Title</span>
              <input
                defaultValue={taskValue.title}
                onChange={(e) =>
                  setTaskValue({ ...taskValue, title: e.target.value })
                }
                type="text"
                className="h-10 p-2"
              />
              {taskValue.title.length < 3 && (
                <span className="text-xs text-red-500 font-medium">
                  Title must have more than 3 characters
                </span>
              )}
              <span className="text-sm text-gray-500 font-medium">Status</span>
              <div className="relative">
                <button
                  onClick={() => setStatusFilter(!statusFilter)}
                  className="w-full bg-white flex justify-between items-center gap-x-8 px-5 py-2 rounded-md font-medium"
                >
                  <div>{taskValue.status}</div>
                  <FaAngleDown />
                </button>
                {statusFilter && (
                  <div className="absolute w-full right-0 bg-indigo-50 border border-indigo-200 flex flex-col justify-between items-center rounded-sm font-medium">
                    {statusDropdown.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setTaskValue({
                            ...taskValue,
                            status:
                              status === "Complete" ? "Complete" : "Incomplete",
                          });
                          setStatusFilter(!statusFilter);
                        }}
                        className="w-full hover:bg-indigo-100 active:bg-indigo-200 border-b border-indigo-200 text-left gap-x-2 px-4 py-1.5 font-medium"
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
                  setShowEditTask(false);
                  setTaskValue({ title: "", status: "Incomplete" });
                }}
                className="bg-gray-300 hover:bg-gray-400 active:bg-gray-200 transition-colors duration-100 text-gray-600 px-5 py-2 rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
            <div className="absolute -top-16 right-0 h-8 w-full flex justify-end">
              <button
                onClick={() => setShowEditTask(false)}
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
