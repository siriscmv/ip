const formFields = [
	...new Set(
		Array.from(document.querySelectorAll('input').entries())
			.filter(([_, el]) => el.name)
			.map(([_, el]) => el.name)
	),
	'expertise'
];

const PATTERNS = {
	name: (s) => /[a-zA-Z]{0,3}\.?\s?[a-zA-Z]+(\s?[a-zA-Z]+)?/.test(s),
	username: (s) => /[a-zA-Z]{3,}/.test(s),
	password: (s) => {
		if (s.length < 8) return false;
		if (!/[a-z]/.test(s)) return false;
		if (!/[A-Z]/.test(s)) return false;
		if (!/[0-9]/.test(s)) return false;
		if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(s)) return false;
		return true;
	},
	email: (s) => {
		if (/[a-zA-Z0-9_]@[a-zA-Z]\.com/.test(s)) return true;
		if (/[a-zA-Z0-9_]\.[a-zA-Z0-9_]@[a-zA-Z]\.org/.test(s)) return true;
		if (/[a-zA-Z0-9_]@[a-zA-Z0-9]\.[a-zA-Z0-9]\.net/.test(s)) return true;
		return false;
	},
	dob: (s) => {
		const age = new Date().getFullYear() - new Date(s).getFullYear();

		if (age < 18) return false;
		if (age > 35) return false;
		return true;
	},
	languages: (s) => {
		if (s.length < 1) return false;
		return true;
	}
};

document.addEventListener('click', (e) => {
	if (!e.target?.name) return;

	const i = formFields.indexOf(e.target.name);
	if (i === -1) return;

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

	if (!hasFilledPreviousFields) {
		alert(`Please fill in the ${formFields[j]} field first`);
		document.querySelector(`input[name="${formFields[j]}"]`).focus();
	}
});
