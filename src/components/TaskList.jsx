import Task from "./Task";

const TaskList = ({ list, removeTask, changeTask }) => {
	return list.map((task) => {
		return (
			<Task
				key={task.id}
				status={task.status}
				text={task.text}
				tags={task.tags}
				deadline={task.deadline}
				removeTask={removeTask(task.id)}
				changeTask={changeTask(task.id)}
			/>
		);
	});
};

export default TaskList;
