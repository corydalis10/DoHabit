import styles from '../../css/SecretAchievementCard.module.css';

function SecretAchievementCard({ achievement, imgSrc }) {
	return (
		<li className={styles.card}>
			<img
				src={imgSrc}
				alt={achievement.title}
				className={styles.img}
			/>

			<div className={styles.infoWrapper}>
				<h4>
					{achievement.title}
				</h4>

				<small className={styles.desc}>
					{achievement.desc}
				</small>
			</div>
		</li>
	);
}

export default SecretAchievementCard;