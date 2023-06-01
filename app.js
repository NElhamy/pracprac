import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import session from "express-session";

import indexRouter from "./routes/index.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
console.log(`Project Root dir : ${__dirname}`);

const app = express();
app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use((req, res, err) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
});

console.log("ENV: ", app.get('env'));

export default app;