import { useDispatch, useSelector } from "react-redux";
import TaskItems from "./TaskItems";
import { useEffect } from "react";
import { fetchTasks } from "../redux/taskSlice";

const TaskList = ({openEditTaskModal, taskId}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <div className="">
      {tasks.results?.map((task) => (
        <TaskItems key={task.id} task={task} taskId={taskId} openEditTaskModal={() => openEditTaskModal(task)} />
      ))}
    </div>
  );
};

export default TaskList;
