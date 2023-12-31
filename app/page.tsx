import AddTask from "./components/AddTask";
import TasksView from "./components/TasksView";

export default async function Home() {
  return (
    <>
      <AddTask />
      <TasksView />
    </>
  );
}
