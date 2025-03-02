import { useSelector } from "react-redux";
import TaskItems from "./TaskItems";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <div>
      {tasks.map((task) => (
        <TaskItems key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
