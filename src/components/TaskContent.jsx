import TaskList from "./TaskList";

const TaskContent = () => {
  return (
    <div className="border p-2 border-gray-400 rounded-md">
      <h1 className=" font-bold pb-3">~ task management app ~</h1>
      <TaskList />
      <div className="pt-3 justify-self-end">
        <button  className="px-6 py-3 bg-emerald-400 rounded-lg font-bold">
          Add new task
        </button>
      </div>
    </div>
  );
};

export default TaskContent;
