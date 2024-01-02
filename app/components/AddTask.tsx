"use client";

//react
import { useEffect, useState } from "react";

//next
import { useRouter } from "next/navigation";
import Link from "next/link";

//react icons
import { IoClose } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";

//actions
import { addNewTask, getTasks } from "../actions/tasks";
import { listFilter, statusDropdown } from "@/config/config";
import TasksView from "./TasksView";

//types
import { Task } from "@/config/types";
import { getUsers } from "../actions/users";

export default function AddTask() {
  const router = useRouter();

  //Filter
  const [openFilter, setOpenFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("ALL");

  //Tasks values
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [userLogged, setUserLogged] = useState("");

  //Add Task Modal
  const [showAddTask, setShowAddTask] = useState(false);
  const [statusFilter, setStatusFilter] = useState(false);

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
    setShowAddTask(false);
  }

  //Get Tasks depending on the status filter
  async function getFilteredTasks(filter: string) {
    const tasksFiltered = await getTasks(userLogged, filter);
    setTasks(tasksFiltered);
    setFilterValue(`${filter}`);
    setOpenFilter(!openFilter);
  }

  function logOut(){
    localStorage.removeItem("user");
    window.location.reload();
  }

  useEffect(() => {
    const getUsernameFromLocalStorage = () => {
      const storedUsername = localStorage.getItem("user");
      if (storedUsername) {
        setUserLogged(storedUsername);
      }
    };
    getUsernameFromLocalStorage();
  }, []);

  return (
    <>
      {userLogged !== "" ? (
        <>
          <section>
            <div className="w-full flex justify-between">
              <button
                onClick={() => setShowAddTask(true)}
                className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium"
              >
                Add Task
              </button>
              <div className="relative">
                <button
                  onClick={() => setOpenFilter(!openFilter)}
                  className="bg-gray-300 hover:bg-gray-400 active:bg-gray-200 flex justify-between items-center gap-x-8 px-5 py-2 rounded-md font-medium"
                >
                  <div>{filterValue}</div>
                  <FaAngleDown />
                </button>
                {openFilter && (
                  <div className="absolute w-full right-0 mt-2 bg-indigo-50 border border-indigo-200 flex flex-col justify-between items-center rounded-md font-medium">
                    {listFilter.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => getFilteredTasks(filter)}
                        className="w-full hover:bg-indigo-100 active:bg-indigo-200 border-b border-indigo-200 text-left gap-x-2 px-4 py-1.5 font-medium"
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {showAddTask ? (
              <>
                <div
                  onClick={() => setShowAddTask(false)}
                  className="fixed z-30 top-0 left-0 flex justify-center items-center w-full h-[100dvh] bg-black/50"
                />

                <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-indigo-50 rounded-lg p-5 space-y-6">
                  <h2 className="text-xl font-semibold text-gray-600">
                    Add Task
                  </h2>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-500 font-medium">
                      Title
                    </span>
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
                    <span className="text-sm text-gray-500 font-medium">
                      Status
                    </span>
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
                                    status === "Complete"
                                      ? "Complete"
                                      : "Incomplete",
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
                      onClick={() => newTask()}
                      disabled={taskValue.title.length < 3}
                      className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-400 disabled:bg-indigo-300 transition-colors duration-100 text-white px-5 py-2 rounded-md font-medium"
                    >
                      Add Task
                    </button>
                    <button
                      onClick={() => {
                        setShowAddTask(false);
                        setTaskValue({ title: "", status: "Incomplete" });
                      }}
                      className="bg-gray-300 hover:bg-gray-400 active:bg-gray-200 transition-colors duration-100 text-gray-600 px-5 py-2 rounded-md font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="absolute -top-16 right-0 h-8 w-full flex justify-end">
                    <button
                      onClick={() => setShowAddTask(false)}
                      className="w-8 h-full bg-gray-100 p-0 flex justify-center items-center rounded-md"
                    >
                      <IoClose className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </section>
          <TasksView
            userLogged={userLogged}
            filter={filterValue}
            tasks={tasks}
            setTasks={setTasks}
          />
          <div className="flex justify-center items-center">
            <button
              onClick={() => logOut()}
              className="w-full max-w-[10rem] bg-red-500 hover:bg-red-600 active:bg-red-400 text-white py-1.5 px-2 rounded-md mt-2"
            >
              LogOut
            </button>
          </div>
        </>
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
  );
}
