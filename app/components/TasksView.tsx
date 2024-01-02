"use client";

//react
import { Dispatch, SetStateAction, useEffect } from "react";

//types
import { Task } from "@/config/types";
import { getTasks } from "../actions/tasks";

//icons
import TaskBox from "./TaskBox";

type TasksViewProps = {
  userLogged: string;
  filter: string;
  tasks: Task[] | null;
  setTasks: Dispatch<SetStateAction<Task[] | null>>
}

export default function TasksView({userLogged, filter, tasks, setTasks}: TasksViewProps) {

  //Get tasks from the user and store it
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await getTasks(userLogged, filter);
        setTasks(allTasks);
      } catch (error) {
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="w-full max-h-[504px] overflow-y-auto flex flex-col space-y-4 items-center bg-indigo-50 rounded-lg mt-1.5 p-6">
      {tasks?.length ? (
        tasks.map((task) => (
          <TaskBox
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            createdAt={task.createdAt}
            updatedAt={task.updatedAt}
          />
        ))
      ) : (
        //Show Message if there are no tasks found
        <div className="bg-zinc-200 px-3 py-1.5 rounded-md text-sm font-medium">
          No Todo Found
        </div>
      )}
    </div>
  );
}
