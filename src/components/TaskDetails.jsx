import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

const TaskDetails = ({ taskToEdit, setIsModalOpen }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSave = () => {
    console.log("Saved Task:", { title, description });
    const newTask = {
        title: title,
        description: description,
        completed: true
      }
    console.log(newTask,'99999999999');
    
    dispatch(addTask(newTask))
    setIsModalOpen(false); // بستن مدال
  };
  const handleEditTask = () => {
    const updatedTask = {
     title: 'update task',
     description: 'updated description',
     completed: true,
    }
    dispatch(editTask({taskId, updatedTask}))
    openEditTaskModal(task);
    
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="font-bold text-lg mb-4">
          {taskToEdit ? "Edit Task" : "Add New Task"}
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 mb-3 w-full rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 mb-3 w-full rounded"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => handleSave()}
            className="px-4 py-2 bg-emerald-400 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
