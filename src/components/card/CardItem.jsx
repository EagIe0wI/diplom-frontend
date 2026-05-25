import React from 'react';
import styles from '../../styles/CardItem.module.css';

function CardItem({ card, onEnterCard }) {
	return (
		<li className={styles.item} onClick={() => onEnterCard(card)}>
			<span className={styles.link}>{card.title} ...</span>
		</li>
	);
}

export default CardItem;
