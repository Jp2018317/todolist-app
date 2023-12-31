import AddTask from "./components/AddTask";

export default async function Home() {
  return (
    <>
      <AddTask />
      <div className="w-full h-full flex justify-center items-center bg-gray-100 rounded-lg min-h-20 mt-2">
        <div className="bg-zinc-200 px-3 py-1.5 rounded-md text-sm font-medium">
          No Todo Found
        </div>
      </div>
    </>
  );
}
