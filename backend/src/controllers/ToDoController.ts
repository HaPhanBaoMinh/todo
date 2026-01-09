import { Request, Response } from 'express';
import TodoUseCase from '../application/TodoUseCase';
import ITodoController from './IToDoController';
import Todo from '../domain/entities/Todo';

class TodoController implements ITodoController {
	private todoUseCase: TodoUseCase;

	constructor(todoUseCase: TodoUseCase) {
		this.todoUseCase = todoUseCase;
	}

	async getToDos(req: Request, res: Response): Promise<void> {
		try {
			const todos = await this.todoUseCase.getTodos();
			res.status(200).json(todos);
		} catch (error) {
			res.status(500).json({ error: 'Failed to fetch todos' });
		}
	}

	async createToDo(req: Request, res: Response): Promise<void> {
		try {
			const body = req.body;

			// Validation
			if (!body.task) {
				res.status(400).json({ error: 'Invalid body: "task" is required and should be a string' });
				return;
			}

			const todoData = new Todo(body.task);
			console.log('Creating Todo:', todoData.toString());

			const newTodo = await this.todoUseCase.createTodo(todoData);
			res.status(201).json(newTodo);
		} catch (error) {
			res.status(500).json({ error: 'Failed to create todo' });
		}
	}

}

export default TodoController;
