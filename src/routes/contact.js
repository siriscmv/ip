export default function Contact() {
	return (
		<>
			<h2 className='text-center sec'>Contact</h2>

			<main className='main-body'>
				<span className='big-text'>Contact us</span>
				<p>You can find the contact details below:</p>
				<div
					style={{
						padding: '8px',
						color: '#3d5a80',
						backgroundImage: "url('./media/contact.jpg')",
						backgroundSize: '100% 100%',
						backgroundRepeat: 'no-repeat',
						height: '400px'
					}}
				>
					Email: hello@domain.xyz
					<br />
					Call: +91 1234567890
				</div>
			</main>
		</>
	);
}
