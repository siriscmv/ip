export default function ImportantDates() {
	return (
		<>
			<h2 className='text-center sec'>Important Dates</h2>

			<main className='main-body'>
				<span className='big-text'>Find the list of upcoming events and their dates below:</span>
				<ul className='list content'>
					{dates.map((date, i) => (
						<li key={i}>{date}</li>
					))}
				</ul>
			</main>
		</>
	);
}

const dates = [
	'Paper Submission Deadline : December 10, 2022 January 10, 2023 CLOSED',
	'Notification of Acceptance : January 10, 2023 February 03, 2023',
	'Camera Ready Copy & Registration : January 30, 2023 February 10, 2023',
	'Pre-Conference Workshop : February 23, 2023',
	'Conference : February 24 & 25, 2023'
];
