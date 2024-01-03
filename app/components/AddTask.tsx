"use client";

//react
import { useEffect, useState } from "react";

//next
import Link from "next/link";

//react icons
import { FaAngleDown } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

//actions
import { addNewTask, getTasks } from "../actions/tasks";
import { listFilter, statusDropdown } from "@/config/config";

//types
import { Task } from "@/config/types";

//shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import TasksView from "./TasksView";

export default function AddTask() {
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  //Filter
  const [openFilter, setOpenFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("ALL");

  //Tasks values
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [userLogged, setUserLogged] = useState("");

  //Add Task Modal
  const [open, setOpen] = useState(false);

  //Add Task form value
  const [taskValue, setTaskValue] = useState<{
    title: string;
    status: "Complete" | "Incomplete";
  }>({ title: "", status: "Incomplete" });

  async function newTask() {
    await addNewTask({
      title: taskValue.title,
      status: taskValue.status,
      author: userLogged,
    });
    setTaskValue({ title: "", status: "Incomplete" });
    setOpen(false);
  }

  //Get Tasks depending on the status filter
  async function getFilteredTasks(filter: string) {
    const tasksFiltered = await getTasks(userLogged, filter);
    setTasks(tasksFiltered);
    setFilterValue(`${filter}`);
    setOpenFilter(!openFilter);
  }

  function logOut() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  useEffect(() => {
    const getUsernameFromLocalStorage = () => {
      const storedUsername = localStorage.getItem("user");
      if (storedUsername) {
        setUserLogged(storedUsername);
      }
      setIsLoading(false);
    };
    getUsernameFromLocalStorage();
  }, []);

  return (
    <>
      <section>
        <div className="w-full flex justify-between">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium">
              Add Task
            </DialogTrigger>
            <DialogContent className="bg-indigo-50">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-gray-600">Add Task</DialogTitle>
              </DialogHeader>
              
              <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-500 font-medium">
                      Title
                    </span>
                    <input
                      defaultValue={taskValue.title}
                      onChange={(e) =>
                        setTaskValue({
                          ...taskValue,
                          title: e.target.value,
                        })
                      }
                      type="text"
                      className="h-10 p-2"
                    />
                    {taskValue.title.length < 3 && (
                      <span className="text-xs text-red-500 font-medium">
                        Title must have more than 3 characters
                      </span>
                    )}
                    <span className="text-sm text-gray-500 font-medium">
                      Status
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="w-full bg-white flex justify-between items-center gap-x-8 px-5 py-2 rounded-md font-medium">
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
                                status:
                                  status === "Complete"
                                    ? "Complete"
                                    : "Incomplete",
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
                  <div className="w-full flex gap-2">
                    <button
                      onClick={() => newTask()}
                      disabled={taskValue.title.length < 3}
                      className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 disabled:bg-indigo-300 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium"
                    >
                      Add Task
                    </button>
                    <button
                      onClick={() => {setOpen(false);}}
                      className="bg-gray-300 hover:bg-gray-400 active:bg-gray-200 transition-colors duration-100 text-gray-600 px-5 py-2 rounded-md font-medium"
                    >
                      Cancel
                    </button>
                  </div>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-gray-200 flex justify-between items-center gap-x-8 px-5 py-2 rounded-md font-medium">
              <div>{filterValue}</div>
              <FaAngleDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {listFilter.map((filter) => (
                <>
                  <DropdownMenuItem
                    key={filter}
                    onClick={() => getFilteredTasks(filter)}
                  >
                    {filter}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
      {isLoading ? (
        <div className="w-full flex justify-center py-10 bg-indigo-50 rounded-md mt-1.5">
          <AiOutlineLoading3Quarters className="animate-spin text-indigo-500 w-8 h-8" />
        </div>
      ) : (
        <>
          {userLogged !== "" ? (
            <TasksView
              userLogged={userLogged}
              filter={filterValue}
              tasks={tasks}
              setTasks={setTasks}
            />
          ) : (
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
          )}
        </>
      )}
      <div className="flex justify-center items-center">
        <button
          onClick={() => logOut()}
          className="w-full max-w-[10rem] bg-red-500 hover:bg-red-600 active:bg-red-400 text-white py-1.5 px-2 rounded-md mt-2"
        >
          LogOut
        </button>
      </div>
    </>
  );
}
