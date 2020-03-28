const http = require("http");
const fs = require("fs");
const url = require("url");
const https = require("https");
let port = process.argv[2];

!port && (port = 8888);

const server = http.createServer((request, response) => {
	const parsedUrl = url.parse(request.url, true);
	const pathWithQuery = request.url;
	let queryString = "";
	if (pathWithQuery.indexOf("?") >= 0) {
		queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
	}
	const path = parsedUrl.pathname;
	const query = parsedUrl.query;
	const method = request.method;

	if (path === "/a.html") {
		https.get("https://cnodejs.org/api/v1/topics", (res) => {
			let data = [];
			res.on("data", chunk => {
				data.push(chunk);
			});
			res.on("end", () => {
				response.setHeader("Content-Type", "application/json; charset=utf-8");
				response.end(Buffer.concat(data).toString());
			});
		});
	} else {
		response.statusCode = 404;
		response.setHeader("Content-Type", "text/html");
		response.write("not found");
		response.end();
	}
});

server.listen(port);
console.log("http://localhost:" + port);
