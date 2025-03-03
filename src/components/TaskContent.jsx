import { useState } from "react";
import TaskList from "./TaskList";
import TaskDetails from "./TaskDetails";

const TaskContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const openAddTaskModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  }
  const openEditTaskModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
    console.log(task);
    
  }
  return (
    <div className="border p-2 border-gray-400 rounded-md">
      <h1 className=" font-bold pb-3">~ task management app ~</h1>
      <TaskList openEditTaskModal={openEditTaskModal} />
      <div className="pt-3 justify-self-end">
        <button onClick={openAddTaskModal}  className="px-6 py-3 bg-emerald-400 rounded-lg font-bold">
          Add new task
        </button>
      </div>
      {isModalOpen && (
        <TaskDetails taskToEdit={taskToEdit} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default TaskContent;
