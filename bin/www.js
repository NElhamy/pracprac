import app from '../app.js';
import { createServer } from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { on } from "events";

dotenv.config({ path: "./.env" });

app.set("env", process.env.ENV);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.set("port", PORT);
app.set("host", HOST);

const server = createServer(app);

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
	console.log("Connected to the database");
	server.listen(PORT);
	server.on("error", onError);
	server.on("listening", onListening);
})
.catch((err) => {
	console.log("Cannot connect to the database", err);
	process.exit();
});

function onError(error) {
	if (error.syscall !== 'listen')
		throw error;

	var bind = 'Port ' + PORT;

	switch (error.code) {
		case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		default:
		throw error;
	}
}

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string'
	? 'pipe ' + addr
	: 'port ' + addr.port;
	console.log('Listening on ' + bind);
}