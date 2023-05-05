export default function Committee() {
	return (
		<>
			<h2 className='text-center sec'>Committee</h2>

			<main className='main-body'>
				<span className='big-text'>List of committee members</span>
				<table className='content'>
					<tr>
						<th>Name</th>
						<th>University</th>
						<th>Country</th>
					</tr>
					{members.map((member, i) => {
						return (
							<tr key={i}>
								<td>{member.name}</td>
								<td>{member.university}</td>
								<td>{member.country}</td>
							</tr>
						);
					})}
				</table>
			</main>
		</>
	);
}

const members = [
	{ name: 'Prof. Eunika Mercier-Laurent', university: 'University of Reims Champagne-Ardenne', country: 'France' },
	{
		name: 'Prof. Mieczyslaw Lech Owoc',
		university: 'Wroclaw University of Economics and Business',
		country: 'Poland'
	},
	{ name: 'Dr.Kiran Reddy M', university: 'Aalto University', country: 'Finland' },
	{ name: 'Dr Arun A, General Motors R&D', university: 'Michigan', country: 'USA' },
	{ name: 'Dr. Deepak Padmanabhan', university: "Queen's University Belfast", country: 'UK' },
	{ name: 'Dr. Shomona Gracia Jacob', university: 'Nizwa College of Technology', country: 'Oman' },
	{ name: 'Dr. Bahman Arasteh Abbasabad', university: 'Istinye University', country: 'Turkey' },
	{ name: 'Dr. Femilda Josephin Shobana Bai', university: 'Istinye University', country: 'Turkey' },
	{ name: 'Mr. Irshad P', university: 'HCL Technologies', country: 'Japan' },
	{ name: 'Dr. Ammar Mohammed', university: 'Cairo University', country: 'Egypt' },
	{ name: 'Dr. Latha Karthika', university: 'Brandupwise Marketing', country: 'New Zealand' },
	{ name: 'Mr. lijo Jose', university: 'Broadcom Inc.', country: 'Bangalore' },
	{ name: 'Dr. Dileep A. D', university: 'IIT Mandi', country: 'India' },
	{ name: 'Dr. Rakesh Matam', university: 'IIIT Guwahati', country: 'India' },
	{ name: 'Dr. Debasis Das', university: 'IIT Jodhpur', country: 'India' },
	{ name: 'Dr. Latha Parthiban', university: 'Pondicherry University', country: 'India' },
	{ name: 'Dr. Uma Maheswari', university: 'BITS Pilani', country: 'India' },
	{ name: 'Venkatesh S', university: 'Oracle', country: 'USA' }
];
