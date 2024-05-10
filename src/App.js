import './App.css';

// react
import React, { useEffect, useState } from 'react';

// components
import Header from './components/Header';
import HabitsList from './components/HabitsList';
import Modal from './components/Modal';
import CreateHabitWindow from './components/CreateHabitWindow';

// utils
import createHabit from './utils/createHabit';

function App() {
	const [habits, setHabits] = useState(() => {
		const data = localStorage.getItem('habits');
		return data ? JSON.parse(data) : [];
	});

	// save habits to local storage
	useEffect(() => {
		localStorage.setItem('habits', JSON.stringify(habits));
	}, [habits]);

	// create habit
	const handleCreateHabit = (data) => {
		setHabits(createHabit(habits, data));
		handleCloseModal();
	};

	// modal
	const [modalIsVisible, setModalIsVisible] = useState(false);
	const [modalContent, setModalContent] = useState('');

	const handleCloseModal = () => {
		setModalIsVisible(false);
		setModalContent('');
	};

	return (
		<div className="App">
			<Header
				// 'on' functions
				onOpenCreateHabitWindow={() => {
					setModalContent('createHabitWindow')
					setModalIsVisible(true);
				}}
			/>

			<main>
				<HabitsList
					data={habits}
				/>
			</main>

			{modalIsVisible && (
				<Modal
					// 'on' functions
					onClose={handleCloseModal}
				>
					{modalContent === 'createHabitWindow' && (
						<CreateHabitWindow
							// 'on' functions
							onCreate={(data) => handleCreateHabit(data)}
						/>
					)}
				</Modal>
			)}
		</div>
	);
}

export default App;
