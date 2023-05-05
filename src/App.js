import Home from './routes/home.js';
import Committee from './routes/com.js';
import CallForPapers from './routes/cfp.js';
import ImportantDates from './routes/impdates.js';
import Workshops from './routes/work.js';
import Registration from './routes/regis.js';
import Contact from './routes/contact.js';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const links = [
	{ name: 'Home', path: '/', page: Home },
	{ name: 'Committee', path: '/com', page: Committee },
	{ name: 'Call for Papers', path: '/cfp', page: CallForPapers },
	{ name: 'Important Dates', path: '/impdates', page: ImportantDates },
	{ name: 'Workshops', path: '/workshops', page: Workshops },
	{ name: 'Registration', path: '/reg', page: Registration },
	{ name: 'Contact', path: '/contact', page: Contact }
];

function App() {
	return (
		<div id='app-container'>
			<Router>
				<nav>
					<img alt='logo' width='48px' height='48px' id='logo' src='/media/logo.png' />
					<div>
						<div className='big-text sec'>Navigate</div>
						<div className='nav-list'>
							{links.map((link) => (
								<Link key={link.page} to={link.path}>
									{link.name}
								</Link>
							))}
						</div>
					</div>
				</nav>

				<br />
				<hr />
				<hr />

				<Routes>
					{links.map((link) => (
						<Route exact key={link.path} path={link.path} element={<link.page />} />
					))}
				</Routes>

				<hr />
				<footer>
					<p>&copy; 2023 International Conference. All rights reserved.</p>
				</footer>
			</Router>
		</div>
	);
}

export default App;
