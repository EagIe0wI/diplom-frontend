import React from 'react';
import styles from '../../styles/TaskItem.module.css';

function TaskItem({ task, onEnterTask }) {
	return (
		<li className={styles.item} onClick={() => onEnterTask(task)}>
			<span className={styles.link}>{task.title} ...</span>
		</li>
	);
}

export default TaskItem;
