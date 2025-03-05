import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/taskSlice";

const TaskDetails = ({ taskToEdit, setIsModalOpen }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setCompleted(taskToEdit.completed ?? false);
    } else {
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    if (taskToEdit) {
      //when edit task
      dispatch(editTask({
        id: taskToEdit.id,
        updatedTask: { title, description, completed },
      }));
    } else {
      //when add new task
      dispatch(addTask({
        title,
        description,
        completed,
      }));
    }
    setIsModalOpen(false);
  };

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
        <div className="text-start pb-3">
          <h3>Task Status:</h3>
          <div className="flex justify-start items-center gap-1">
            <label htmlFor="radio1">Complete</label>
            <input
              type="radio"
              name="radioChoose"
              id="radio1"
              checked={completed}
              onChange={() => setCompleted(true)}
            />
            <label htmlFor="radio2">Not Complete</label>
            <input
              type="radio"
              name="radioChoose"
              id="radio2"
              checked={!completed}
              onChange={() => setCompleted(false)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-emerald-400 text-white rounded"
          >
            {taskToEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
