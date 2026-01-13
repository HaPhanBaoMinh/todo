import { Router } from 'express';
import IToDoController from './controllers/IToDoController';

const toDoRoutes = (toDoController: IToDoController) => {
	const router = Router();

	// Middleware to ensure DB connection
	router.get('/todos', toDoController.getToDos.bind(toDoController));
	router.put('/todo/:id', toDoController.toggleToDo.bind(toDoController));
	router.post('/todo', toDoController.createToDo.bind(toDoController));
	router.delete('/todo/:id', toDoController.deleteToDo.bind(toDoController));

	return router;
}

export { toDoRoutes };
