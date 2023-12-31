export default async function Home() {
  return (
    <>
      <div className="w-full flex justify-between">
        <button className="bg-indigo-500 text-white px-5 py-2 rounded-md font-medium">
          Add Task
        </button>
        <button className="bg-gray-300 px-5 py-2 rounded-md font-medium">
          ALL
        </button>
      </div>
      <div className="w-full h-full flex justify-center items-center bg-gray-100 rounded-lg min-h-20">
        <div className="bg-zinc-200 px-3 py-1.5 rounded-md text-sm font-medium">
          No Todo Found
        </div>
      </div>
    </>
  );
}
