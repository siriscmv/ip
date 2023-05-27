import { readFile } from "fs/promises";
import { createInterface } from "readline";

const rl = createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function run() {
	const greetings = (
		await readFile("greetings.txt", "utf8").catch(() => {
			console.error(
				"Greeting file not found. Please create a greetings.txt file in the root directory of the project."
			);
			process.exit(1);
		})
	).split("\n");

	rl.question("What is your name? ", (name) => {
		console.log(
			`${
				greetings[Math.floor(Math.random() * greetings.length)]
			}, ${name}!`
		);
		rl.close();
	});
}

run();
