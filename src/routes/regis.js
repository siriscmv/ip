import './regis.css';
import { useState, useEffect } from 'react';

export default function Registration() {
	const [formFields, setFormFields] = useState([]);

	useEffect(() => {
		setFormFields(attachDynamicListeners());
	}, []);

	return (
		<>
			<h2 className='text-center sec'>Registration</h2>

			<main className='main-body'>
				<span className='big-text'>Register as a student/teacher in the form below:</span>
				<br />
				<span>Use enter key to go to the next field</span>
				<div className='content'>
					<form>
						<fieldset>
							<label for='salutations'>Salutations</label>
							<br />
							<input type='radio' id='mr' name='salutations' value='mr' />
							<label for='mr'>Mr</label>
							<input type='radio' id='miss' name='salutations' value='miss' />
							<label for='miss'>Miss</label>
							<input type='radio' id='mrs' name='salutations' value='mrs' />
							<label for='mrs'>Mrs</label>
							<input type='radio' id='dr' name='salutations' value='dr' />
							<label for='dr'>Dr</label>
							<br />

							<label for='name'>Enter your name:</label>
							<br />
							<div className='form-field-parent'>
								<input autocomplete required type='text' id='name' name='name' />
								<span id='namehelper'></span>
							</div>

							<label for='username'>Enter your username:</label>
							<br />
							<div className='form-field-parent'>
								<input autocomplete required type='datalist' list='usernames' name='username' id='username' />
								<span id='usernamehelper'></span>
							</div>

							<datalist id='usernames'>
								{names.map((name, i) => (
									<option key={i} value={name} />
								))}
							</datalist>
						</fieldset>
						<fieldset>
							<label for='password'>Enter your password:</label>
							<br />
							<div className='form-field-parent'>
								<input required type='password' id='password' name='password' />
								<span id='passwordhelper'></span>
							</div>

							<label for='email'>Enter your email:</label>
							<br />
							<div className='form-field-parent'>
								<input autocomplete required type='email' id='email' name='email' />
								<span id='emailhelper'></span>
							</div>
						</fieldset>
						<fieldset>
							<label for='dob'>Enter your DOB</label>
							<br />

							<div className='form-field-parent'>
								<input min='1950-01-01' max='2020-01-01' required type='date' id='dob' name='dob' />
								<span id='dobhelper'></span>
							</div>

							<label for='photo'>Upload your photo</label>
							<br />
							<input required type='file' accept='.png,.jpg,.jpeg,.gif,.webp' id='photo' name='photo' />
							<br />
						</fieldset>
						<fieldset>
							<label for='langauges'>Languages known</label>
							<br />
							<input type='checkbox' id='english' name='langauges' value='english' />
							<label for='english'>English</label>
							<input type='checkbox' id='tamil' name='langauges' value='tamil' />
							<label for='tamil'>Tamil</label>
							<input type='checkbox' id='french' name='langauges' value='french' />
							<label for='french'>French</label>
							<input type='checkbox' id='others' name='langauges' value='others' />
							<label for='others'>Others</label>

							<br />
							<label for='expertise'>Additional Expertise:</label>
							<br />
							<textarea placeholder='Enter your expertise here' id='expertise' name='expertise'></textarea>
						</fieldset>
						<fieldset>
							<input
								id='submit'
								type='submit'
								value='Submit'
								onClick={() => {
									if (checkFields(formFields).hasFilledPreviousFields) alert('Details have been subitted successfully');
									else alert('Please fill all the fields first');
								}}
							/>
							<input
								id='reset'
								type='reset'
								value='Clear'
								onClick={() => {
									window.scrollTo({ top: 0 });
								}}
							/>
						</fieldset>
					</form>
				</div>
			</main>
			<script src='/scripts/regis.js' />
		</>
	);
}

const attachDynamicListeners = () => {
	const formFields = [
		...new Set(
			Array.from(document.querySelectorAll('input').entries())
				.filter(([_, el]) => el.name)
				.map(([_, el]) => el.name)
		),
		'expertise'
	];

	window.onkeydown = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			return false;
		}
	};

	document.addEventListener('click', (e) => {
		if (!e.target?.name) return;

		const i = formFields.indexOf(e.target.name);
		if (i === -1) return;

		for (const name of formFields) {
			if (getHelper(name)) {
				const t = getHelper(name);
				if (t.innerText === 'OK') t.innerText = '';
				else if (t.innerText.length) {
					document.getElementById(name).focus();
					return;
				}
			}
		}

		const res = checkFields(formFields, i);
		if (!res.hasFilledPreviousFields) {
			const j = res.index;
			alert(`Please fill in the ${formFields[j]} field first`);

			e.target.blur();

			if (j === 0) window.scrollTo({ top: 0 });
			else document.querySelectorAll(`input[name="${formFields[j]}"]`).item(0).focus();
		}
	});

	for (const pattern of Object.keys(PATTERNS)) {
		const tag = document.getElementById(pattern);
		const validator = PATTERNS[pattern];

		tag.onkeydown = (e) => {
			if (e.keyCode !== 13) return;

			getHelper(e.target.id).innerText = '';
			getHelper(e.target.id).className = '';
			const value = e.target.value;
			const res = validator(value);

			if (res === true) {
				e.target.blur();
				const ix = formFields.indexOf(e.target.name) + 1;
				document.querySelectorAll(`input[name="${formFields[ix]}"]`).item(0).focus();
			} else {
				e.target.value = '';
				e.target.focus();
			}
		};

		tag.addEventListener('input', (e) => {
			const value = e.target.value;
			const res = validator(value);

			if (res === true) {
				getHelper(e.target.id).innerText = 'OK';
				getHelper(e.target.id).className = 'green';
			} else {
				getHelper(e.target.id).innerText = res;
				getHelper(e.target.id).className = 'red';
			}
		});
	}

	return formFields;
};

const checkFields = (formFields, i = formFields.length) => {
	let hasFilledPreviousFields = true;
	let j = 0;
	for (j = 0; j < i; j++) {
		const f = document.querySelectorAll(`input[name="${formFields[j]}"]`);
		if (f.length === 1) {
			if (!f[0].value) {
				hasFilledPreviousFields = false;
				break;
			}
		} else if (f.length > 1) {
			if (Array.from(f.entries()).filter(([_, el]) => el.checked).length === 0) {
				hasFilledPreviousFields = false;
				break;
			}
		} else console.error('No field found for', formFields[j]);
	}

	return { hasFilledPreviousFields, index: j };
};

const getHelper = (name) => document.getElementById(name + 'helper');

const PATTERNS = {
	name: (s) => {
		if (/[a-zA-Z]{0,3}\.?\s?[a-zA-Z]+(\s?[a-zA-Z]+)?/.test(s)) return true;
		else return 'Name can have an initial and 1-2 words';
	},
	username: (s) => {
		if (/[a-zA-Z]{3,}/.test(s)) return true;
		else return 'username can have only alphabets (3 characters min)';
	},
	password: (s) => {
		if (!/[a-z]/.test(s)) return 'Password must have atleast one lowercase character';
		if (!/[A-Z]/.test(s)) return 'Password must have atleast one uppercase character';
		if (!/[0-9]/.test(s)) return 'Password must have atleast one number character';
		if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(s)) return 'Password must have atleast one special character';
		if (s.length < 8) return 'Password must be atleast 8 characters';
		return true;
	},
	email: (s) => {
		if (/[a-zA-Z0-9_]+@[a-zA-Z]+\.com/.test(s)) return true;
		if (/[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+@[a-zA-Z]+\.org/.test(s)) return true;
		if (/[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.net/.test(s)) return true;
		return 'Email must be of the form xxxx@some.com, xxx.yyy@some.org or xxx@some1.some2.net';
	},
	dob: (s) => {
		const age = new Date().getFullYear() - new Date(s).getFullYear();

		if (age < 18) return 'You must be atleast 18 years old';
		if (age > 35) return 'You must not be more than 35 years old';
		return true;
	}
};

const names = [
	'shipwreckconstant',
	'rotantique',
	'witnesssnowboard',
	'scoopwan',
	'myrrhout',
	'ebayclassroom',
	'buoyantspectacle',
	'artichokecinnamon',
	'gyrussympathy',
	'barberryclient',
	'employfence',
	'sleighinvent',
	'vehicledna',
	'witchillogical',
	'dangocupid',
	'stakingturtleneck',
	'scandaljellied',
	'crankygrinning',
	'actuallyperfectly',
	'reallytranslate',
	'cutknee',
	'burystock',
	'glidebetrayed',
	'voluminouswatchful',
	'fairwisdom',
	'muffincomedy',
	'biscayobedient',
	'despairingheartpulse',
	'holeexcitement',
	'arisepumped',
	'vinespirit',
	'tropicalwindbound',
	'defiantplastic',
	'saviorblackening',
	'underageconsensus',
	'sowsevegan',
	'professglowstone',
	'ersttreble',
	'visitits',
	'cheeryregulate',
	'populationjibe',
	'shellcurve',
	'frybreaddispenser',
	'doubtprofuse',
	'stablefire',
	'eagerfrigid',
	'choughcampus',
	'cocktailbam',
	'twangimmigrate',
	'porscheguarded',
	'scootmangoes',
	'listbrother',
	'unwittingportray',
	'dugwren',
	'satisfiedsane',
	'properapply',
	'bloatedhearty',
	'heelssociable',
	'lollipopbabble',
	'wherephew',
	'blackberrieswhose',
	'humorouscourteous',
	'amazinganchovies',
	'batterpaella',
	'packjoystick',
	'uptighthonky',
	'veximmodest',
	'sinremind',
	'jowlliving',
	'foretellparrot',
	'mulleinbobolink',
	'saveaccept',
	'unkemptbento',
	'trafalgarmacaw',
	'tensiongentleman',
	'wickedstatement',
	'nautilusraid',
	'alarmingsurprising',
	'obviouslyguffaw',
	'solidanimal',
	'meetingidle',
	'fatherhot',
	'whistleassociate',
	'stupendousgift',
	'beltfizzle',
	'entertaintrite',
	'beltedoyster',
	'sufferchant',
	'splashabiding',
	'candlelightemployer',
	'protectionspirited',
	'illegalphalanx',
	'biathlonnoun',
	'untidytraveler',
	'tannenbaumharass',
	'relativelyepisode',
	'resolutionlutestring',
	'polecatsversed',
	'heathpeppery',
	'shroomlightfencing'
];
