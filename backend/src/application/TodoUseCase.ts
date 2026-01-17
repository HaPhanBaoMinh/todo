import ITodoUseCase from './ITodoUseCase';
import ITodoRepository from '../services/repositories/ITodoRepository';
import Todo from '../domain/entities/Todo';
import { TodoExpiredTimeError } from '../domain/errors/TodoError';

class TodoUseCase implements ITodoUseCase {
	private todoRepository: ITodoRepository;

	constructor(todoRepository: ITodoRepository) {
		this.todoRepository = todoRepository;
	}

	async getTodos(): Promise<Todo[]> {
		return this.todoRepository.findAll();
	}

	async getTodoById(id: string): Promise<Todo | null> {
		return this.todoRepository.findById(id);
	}

	async createTodo(task: string): Promise<Todo> {
		if (!task.trim()) {
			throw new Error('Task cannot be empty');
		}

		const todo = new Todo(task, false, new Date());
		return this.todoRepository.create(todo);
	}

	async toggleTodo(id: string): Promise<Todo | null> {
		const existingTodo = await this.todoRepository.findById(id);
		if (!existingTodo) {
			return null;
		}

		// Only toggleTodo in 10 minutes after creation
		const tenMinutes = 10 * 60 * 1000;
		const now = new Date();
		const createdAt = existingTodo.CreatedAt;
		if (createdAt && now.getTime() - createdAt.getTime() > tenMinutes) {
			throw new TodoExpiredTimeError('Cannot toggle todo after 10 minutes of creation');
		}

		const updatedTodo = new Todo(existingTodo.Task, !existingTodo.Completed, existingTodo.CreatedAt, existingTodo.Id);
		console.log('Toggling todo:', updatedTodo);

		return this.todoRepository.update(id, updatedTodo);
	}

	async deleteTodo(id: string): Promise<boolean> {
		return this.todoRepository.delete(id);
	}
}

export default TodoUseCase;
