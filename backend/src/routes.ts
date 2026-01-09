import { Router } from 'express';
import IToDoController from './controllers/IToDoController';

const toDoRoutes = (toDoController: IToDoController) => {
	const router = Router();

	// Middleware to ensure DB connection
	router.get('/todos', toDoController.getToDos.bind(toDoController));
	router.post('/todo', toDoController.createToDo.bind(toDoController));

	return router;
}

export { toDoRoutes };
