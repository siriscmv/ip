export default function Work() {
	return (
		<>
			<h2 className='text-center sec'>Workshops</h2>

			<main className='main-body'>
				<span className='big-text'>Find the list of upcoming workshops</span>
				<div className='content'>
					<ul>
						{workshops.map((workshop, i) => {
							return (
								<li key={i}>
									<a href={workshop.link} target='_blank' rel='noreferrer'>
										{' '}
										{workshop.name}{' '}
									</a>
									,<span className='dt'>Date: {workshop.date}</span>,{' '}
									<span className='Venue'>Venue: {workshop.venue}</span>
								</li>
							);
						})}
					</ul>
				</div>
			</main>
		</>
	);
}

const workshops = [
	{
		name: 'International Conference on Advances in Software and Computing Technologies (ICASCT)',
		date: '5th March 2023',
		venue: 'Bengaluru, India',
		link: 'https://www.allconferencealert.com/event-detail.html?ev_id=1008711&amp;eventname=international-conference-on-advances-in-software-and-computing-technologies-(icasct)'
	},
	{
		name: 'International Conference on Environmental, Food, Agriculture and Bio-Technology (ICEFABT)',
		date: '16th March 2023',
		venue: 'Melbourne, Australia',
		link: 'https://www.allconferencealert.com/event-detail.html?ev_id=955721&amp;eventname=international-conference-on-environmental-food-agriculture-and-bio-technology-(icefabt)'
	},
	{
		name: '1486th International Conference on Economics and Finance Research (ICEFR)',
		date: '29th March 2023',
		venue: 'Montreal, Canada',
		link: 'https://www.allconferencealert.com/event-detail.html?ev_id=927064&amp;eventname=1486th-international-conference-on-economics-and-finance-research-(icefr)'
	},
	{
		name: 'International Conference on Robotics, Machine Learning and Artificial Intelligence (ICRMLAI)',
		date: '2nd April 2023',
		venue: 'Dubai, United Arab Emirates',
		link: 'https://www.allconferencealert.com/event-detail.html?ev_id=1058652&amp;eventname=international-conference-on-robotics-machine-learning-and-artificial-intelligence-(icrmlai)'
	},
	{
		name: '1494th International Conference on Recent Innovations in Engineering and Technology (ICRIET)',
		date: '6th April 2023',
		venue: 'Phuket, Thailand',
		link: 'https://www.allconferencealert.com/event-detail.html?ev_id=932089&amp;eventname=1494th-international-conference-on-recent-innovations-in-engineering-and-technology-(icriet)'
	},
	{
		name: 'International Conference on Robotics, Communication Technology, Electronics and Electrical Engineering (ICRRCTEEE)',
		date: '13th April 2023',
		venue: 'New Delhi, India',
		link: 'https://www.allconferencealert.com/event-detail.html?ev_id=938456&amp;eventname=international-conference-on-robotics-communication-technology-electronics-and-electrical-engineering-(icrrcteee)'
	},
	{
		name: 'International Conference on Recent Innovations in Computer Science, Engineering and Technology (ICRICSET)',
		date: '5th May 2023',
		venue: 'Boston, United States of America',
		link: 'https://www.allconferencealert.com/event-detail.html?ev_id=964230&amp;eventname=international-conference-on-recent-innovations-in-computer-science-engineering-and-technology-(icricset)'
	},
	{
		name: 'International Conference on Recent Innovations in Engineering and Technology (ICRIET)',
		date: '14th May 2023',
		venue: 'San Francisco, United States of America',
		link: 'https://www.allconferencealert.com/event-detail.html?ev_id=1026411&amp;eventname=international-conference-on-recent-innovations-in-engineering-and-technology-(icriet)'
	},
	{
		name: 'International Conference on Economics, Finance and Business Management (ICEFBM)',
		date: '22nd May 2023',
		venue: 'Phuket, Thailand',
		link: 'https://www.allconferencealert.com/event-detail.html?ev_id=965999&amp;eventname=international-conference-on-economics-finance-and-business-management-(icefbm)'
	}
];
