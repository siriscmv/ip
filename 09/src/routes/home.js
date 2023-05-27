export default function Home() {
	return (
		<>
			<h2 className='text-center sec'>Home</h2>
			<main className='main-body'>
				<audio autoPlay>
					<source src='./media/welcome.mp3' type='audio/mp3' />
					Your browser does not support the audio tag.
				</audio>
				<span className='big-text'>Welcome to the Internation Conference!</span>
				<div className='content'>
					The sixth edition of this conference (Virtual Mode) provides an opportunity for the researchers, engineers,
					developers, and practitioners from academia and industry to discuss and address the experimental, theoretical
					work and methods in solving problems related to Data Science. Also, to share their experience and exchange
					their ideas in the field of Data Science and Computational Intelligence. This conference will be useful for
					professionals working in Data Science, Artificial Intelligence, Knowledge Management, Internet of Things,
					Systems, Advanced Networks and Security.
				</div>
				<div className='gap'></div>
				<h4 className='text-center sec'>Gallery</h4>
				<div>
					{images.map((image, i) => {
						return (
							<div key={i} className='gallery'>
								<img src={`./media/gallery/${i + 1}.jpg`} alt={image} width='700' height='400' />
								<div className='desc'>{image}</div>
							</div>
						);
					})}
				</div>
			</main>
		</>
	);
}

const images = ['Pre-Conference', 'Meeting', 'Main talk', 'Full strength of the crowd', 'Post conference meeting'];
