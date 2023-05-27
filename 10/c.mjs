import { createServer } from "http";
import { readFile } from "fs/promises";

const server = createServer(async (_, res) => {
	const bookFile = await readFile("books.json", "utf-8");
	const books = JSON.parse(bookFile).books;

	const html = `
    <style>
    table, th, td {
        border: 1px solid black;
    }
    table {
        width: 100%
    }
    </style>
    <h1 align="center">Books List</h1>
    <hr><br>
    <table>
    <tr><th>Title</th><th>Author</th><th>Pages</th></tr>
    ${books
		.map((b) => {
			return `<tr><td>${b.title}</td><td>${b.author}</td><td>${b.pages}</td></tr>`;
		})
		.join("\n")}
    </table>`;

	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");

	res.end(html);
});

server.listen(8080, () => {
	console.log("Server is listening for incoming requests!");
});
