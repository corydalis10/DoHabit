import styles from '../../css/HabitHeader.module.css';

// react
import { useEffect, useRef } from 'react';

// components
import ProgressBar from './ProgressBar';

// icons
import { FaCheck } from "react-icons/fa";
import { HiArchiveBoxXMark } from "react-icons/hi2";

function HabitHeader(props) {
	const {
		title, icon, frequency, diary, colorPalette,
		isTodayCompleted, todayProgress, currentStreak,
		archive,
		onUpdate
	} = props;

	const { baseColor, darkenedColor } = colorPalette;
	const progressPercentage = Math.floor((todayProgress / frequency) * 100);

	const handleUpdateProgress = (e) => {
		e.stopPropagation();

		onUpdate({
			type: 'updateProgress',
			habitTitle: title
		});
	};

	const progressWrapperRef = useRef(null);
	const isFirstRender = useRef(true);

	useEffect(
		() => {
			if (!isFirstRender.current) {
				const el = progressWrapperRef.current;

				if (el) {
					el.classList.toggle(styles.completed, isTodayCompleted);
					el.classList.toggle(styles.uncompleted, !isTodayCompleted);

					setTimeout(
						() => el.classList.remove(styles.uncompleted),
						200
					);

					navigator.vibrate?.(isTodayCompleted ? [10, 10, 10, 10, 10] : 10);
				};
			};

			isFirstRender.current = false;
		},
		[isTodayCompleted, todayProgress]
	);

	return (
		<div className={styles.header}>
			<div
				style={{ backgroundColor: darkenedColor, color: baseColor }}
				className={styles.iconWrapper}
			>
				{icon}
			</div>

			<div className={styles.titleWrapper} >
				<h4 className={styles.title}>
					{title}
				</h4>

				<div className={styles.desc}>
					<small >
						Streak: <strong>{currentStreak}</strong>
					</small>

					{(diary?.length > 0) && (
						<small>
							Notes: <strong>{diary.length}</strong>
						</small>
					)}
				</div>
			</div>

			{!archive && (
				<div
					ref={progressWrapperRef}
					className={styles.progressWrapper}
				>
					{frequency > 1 && (
						<ProgressBar
							{...{ baseColor, darkenedColor, todayProgress }}
							segmentCount={frequency}
						/>
					)}

					<button
						style={{ backgroundColor: isTodayCompleted ? baseColor : darkenedColor }}
						className={`${styles.progressBtn} ${frequency > 1 ? styles.multiFrequency : ''}`}
						onClick={handleUpdateProgress}
					>
						{progressPercentage === 100 ? (
							<FaCheck />
						) : (
							<strong>{progressPercentage}%</strong>
						)}
					</button>
				</div>
			)}

			{archive && (
				<HiArchiveBoxXMark
					className={styles.restoreIcon}
					onClick={() => {
						if (window.confirm('Are you sure you want to restore this habit?')) {
							onUpdate({
								type: 'archiveHabit',
								habitTitle: title
							})
						};
					}}
				/>
			)}
		</div>
	);
}

export default HabitHeader;