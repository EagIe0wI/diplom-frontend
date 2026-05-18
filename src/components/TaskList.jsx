// import Task from "./Task";

// const TaskList = ({ list, removeTask, changeTask }) => {
// 	return list?.map((task) => {
// 		return (
// 			<Task
// 				key={task.id}
// 				status={task.status}
// 				text={task.text}
// 				tags={task.tags}
// 				deadline={task.deadline}
// 				removeTask={removeTask(task.id)}
// 				changeTask={changeTask(task.id)}
// 			/>
// 		);
// 	});
// };

import { useEffect, useState } from 'react';
import { taskAPI } from '../api/tasks';

function TaskList() {
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    taskAPI.getAll()
      .then(data => {
		console.log(data);
		
        setTasks(data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Загрузка задач...</div>;

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;