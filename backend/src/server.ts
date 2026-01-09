import express from "express";
import cors from "cors";
import MongoService from "./services/db/MongoService";
import TodoRepository from "./services/repositories/TodoRepository";
import TodoUseCase from "./application/TodoUseCase";
import TodoController from "./controllers/ToDoController";
import { toDoRoutes } from "./routes";
import 'dotenv/config'

async function start() {
	const app = express();

	// Dependency Injection
	const mongoService = new MongoService(
		process.env.MONGODB_URL || "mongodb://localhost:27017",
		process.env.MONGODB_DB_NAME || "todo_app"
	);

	const toDoRepository = new TodoRepository(mongoService);
	const toDoUseCase = new TodoUseCase(toDoRepository);
	const toDoController = new TodoController(toDoUseCase);

	await mongoService.connect();

	// Middlewares
	app.use(cors());
	app.use(express.json());

	// Routes
	app.use("/api", toDoRoutes(toDoController));
	app.use("/health", async (_, res) => {
		res.status(200).send("OK");
	});

	const PORT = process.env.PORT || 4000;
	app.listen(PORT, () =>
		console.log(`Server listening on port ${PORT}`)
	);
}

start().catch((err) => {
	console.error("Unexpected error starting server:", err);
	process.exit(1);
});

