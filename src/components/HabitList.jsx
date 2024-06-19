import styles from '../css/HabitList.module.css';

// react
import { useState } from 'react';
import { ReactComponent as Calendar } from '../img/calendar.svg'

// components
import Habit from "./Habit/Habit";
import Placeholder from './Placeholder';

// icons
import { FaPlusSquare } from "react-icons/fa";


function HabitList(props) {
	const {
		habits,

		// 'on' functions
		onOpenModal, onUpdateProgress,

		// db
		dbIcons, dbColors
	} = props;

	const [visibleMenuIndex, setVisibleMenuIndex] = useState(-1);

	const habitList = habits.map(
		(habit, index) => (
			<Habit
				key={habit.title}
				{...habit}
				icon={dbIcons.find(([iconTitle]) => iconTitle === habit.iconTitle)?.[1] || '?'}
				color={dbColors[habit.colorIndex]}
				isMenuVisible={visibleMenuIndex === index}

				// 'on' functions
				{...{ onOpenModal, onUpdateProgress }}
				onShowMenu={() => setVisibleMenuIndex(index === visibleMenuIndex ? -1 : index)}
			/>
		)
	);

	return (
		<div className={styles.habitList}>
			{!habitList.length && (
				<Placeholder
					image={<Calendar />}
					title="Looks like you haven't created any habits yet."
					desc="Why not create one now?"
					textOnButton="Create First Habit"
					buttonIcon={<FaPlusSquare />}
					onClick={() => onOpenModal({
						modalContent: 'habitEditor',
						modalTitle: 'Create new habit',
					})}
				/>
			)}

			{habitList}
		</div>
	);
}

export default HabitList;