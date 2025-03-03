import { useDispatch, useSelector } from "react-redux";
import TaskItems from "./TaskItems";
import { useEffect } from "react";
import { fetchTasks } from "../redux/taskSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <div className="">
      {tasks.results?.map((task) => (
        <TaskItems key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
