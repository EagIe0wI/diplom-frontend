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

import React from 'react';
import Task from './Task';

function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
