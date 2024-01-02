"use client";

//react
import { Dispatch, SetStateAction, useEffect } from "react";

//types
import { Task } from "@/config/types";
import { getTasks } from "../actions/tasks";

//icons
import TaskBox from "./TaskBox";

type TasksViewProps = {
  filter: string;
  tasks: Task[] | null;
  setTasks: Dispatch<SetStateAction<Task[] | null>>
}

export default function TasksView({filter, tasks, setTasks}: TasksViewProps) {

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await getTasks("jmorales317", filter);
        setTasks(allTasks);
      } catch (error) {
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="w-full max-h-[490px] overflow-y-auto flex flex-col space-y-4 items-center bg-indigo-50 rounded-lg mt-2 p-5">
      {tasks ? (
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
        <div className="bg-zinc-200 px-3 py-1.5 rounded-md text-sm font-medium">
          No Todo Found
        </div>
      )}
    </div>
  );
}
