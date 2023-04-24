import { readFile } from "fs/promises";
import { createInterface } from "readline";
import { createServer } from "http";
import url from "url";

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

	const server = createServer((req, res) => {
		const query = url.parse(req.url).query;
		const name = url ? /name=(\w+)/.exec(query)?.[1] ?? null : null;

		res.statusCode = 200;
		res.setHeader("Content-Type", "text/plain");

		const msg = name
			? `${
					greetings[Math.floor(Math.random() * greetings.length)]
			  }, ${name}!`
			: "Append your name as a query parameter";
		res.end(msg);
	});

	server.listen(8080, () => {
		console.log("Server is listening for incoming requests!");
	});
}

run();
