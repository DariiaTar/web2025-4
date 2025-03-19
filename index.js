const {Command} = require("commander");
const fs = require("fs");
const http = require("http");

const program = new Command();

program
    .requiredOption("-h, --host <host>", "Server host")
    .requiredOption("-p, --port <port>", "Server port")
    .requiredOption("-i, --input <path>", "Path to JSON file");

program.parse(process.argv);

const options = program.opts();


if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1)
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(fs.readFileSync(options.input, "utf-8"));
});

server.listen(options.port, options.host, () => {
    console.log(`Server running at http://${options.host}:${options.port}/`);
});
