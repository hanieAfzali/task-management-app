import { useDispatch } from "react-redux";
import { CheckIcon, CloseIcon, EditIcon, TrashIcon } from "./SvgIcons";
import { useState } from "react";
import { deleteTask, editTask } from "../redux/taskSlice";
import "./index.css"

const TaskItems = ({ task, openEditTaskModal, taskId }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const dispatch = useDispatch();
  const deleteTasks = () => {
    dispatch(deleteTask(task.id))

    
  }



  return (
    <div
      className={`shadow shadow-gray-500 justify-items-start p-3 m-2 flex flex-row items-center rounded-lg transition-all ${
        task.completed === true ? "bg-white" : "bg-gray-200"
      }`}
    >
      <div className="text-start px-3 flex-1 overflow-auto">
        <h3 className={`text-lg font-semibold ${task.completed === false ? "text-gray-700" : "text-gray-900"} overflow-scroll`}>
          {task.title}
        </h3>
        <p className={`text-sm ${task.completed === true ? "text-gray-500" : "text-gray-700"} overflow-scroll`}>
          {task.description}
        </p>
      </div>
      <div className="flex gap-3 items-center">
      <label className="hidden md:block" htmlFor="complitedInput">completed :</label>
      <input
      id="complitedInput"
        type="checkbox"
        className=" accent-green-600 w-5 h-5"
        checked={task.completed}
        onChange={() => setIsCompleted(!isCompleted)}
      />
        <EditIcon onClick={()=> openEditTaskModal(task)} />
        <TrashIcon onClick={deleteTasks} />
      </div>
    </div>
  );
};

export default TaskItems;
