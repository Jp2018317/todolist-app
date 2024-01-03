"use client";

//types
import { Task } from "@/config/types";

//icons
import TaskBox from "./TaskBox";

type TasksViewProps = {
  tasks: Task[] | null;
}

export default function TasksView({tasks}: TasksViewProps) {

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
