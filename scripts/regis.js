const formFields = [
	...new Set(
		Array.from(document.querySelectorAll('input').entries())
			.filter(([_, el]) => el.name)
			.map(([_, el]) => el.name)
	),
	'expertise'
];

window.onkeydown = (event) => {
	if (event.keyCode == 13) {
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

	const res = checkFields(i);
	if (!res.hasFilledPreviousFields) {
		const j = res.index;
		alert(`Please fill in the ${formFields[j]} field first`);

		e.target.blur();

		if (j === 0) window.scrollTo({ top: 0 });
		else document.querySelectorAll(`input[name="${formFields[j]}"]`).item(0).focus();
	}
});

document.getElementById('submit').addEventListener('click', () => {
	if (checkFields().hasFilledPreviousFields) alert('Details have been subitted successfully');
	else alert('Please fill all the fields first');
});

document.getElementById('reset').addEventListener('click', () => {
	window.scrollTo({ top: 0 });
});

const checkFields = (i = formFields.length) => {
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
		if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(s)) return 'Password must have atleast one special character';
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

const getHelper = (name) => document.getElementById(name + 'helper');
