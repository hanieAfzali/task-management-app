import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/taskSlice"; 
import TaskList from "./TaskList";
import TaskDetails from "./TaskDetails";

const TaskContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const dispatch = useDispatch();

  const openAddTaskModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  return (
    <div className="border p-2 border-gray-400 rounded-md bg-gray-100 shadow">
      <h1 className=" font-bold pb-3">~ Task Management App ~</h1>
      <TaskList openEditTaskModal={openEditTaskModal} />
      <div className="pt-3 justify-self-end">
        <button onClick={openAddTaskModal} className="px-6 py-3 bg-emerald-400 rounded-lg font-bold">
          Add new task
        </button>
      </div>

      {isModalOpen && (
        <TaskDetails
          taskToEdit={taskToEdit}
          setIsModalOpen={setIsModalOpen}
          addNewTask={(task) => dispatch(addTask(task))} 
          editExistTask={(task) => dispatch(editTask(task))} 
        />
      )}
    </div>
  );
};

export default TaskContent;
