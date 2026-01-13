import { ITodoRepository } from '../repositories/ITodoRepository';
import { Todo } from '../domain/Todo';
import { TodoList } from '../domain/Todolist';

export interface ITodoUseCase {
	getTodos(): Promise<TodoList>;
	addTodo(task: string): Promise<Todo>;
	toggleTodo(id: string): Promise<void>;
	deleteTodo(id: string): Promise<void>;
}

class TodoUseCase implements ITodoUseCase {
	private repository: ITodoRepository;

	constructor(repository: ITodoRepository) {
		this.repository = repository;
	}

	async getTodos(): Promise<TodoList> {
		const todos = await this.repository.getAll();
		return new TodoList(todos);
	}

	async addTodo(task: string): Promise<Todo> {
		if (!task.trim()) {
			throw new Error('Task cannot be empty');
		}

		const newTodo = Todo.create(task);
		return await this.repository.create(newTodo);
	}

	async toggleTodo(id: string): Promise<void> {
		// Just call the API to toggle - the backend handles the logic
		await this.repository.update(id, {} as any);
	}

	async deleteTodo(id: string): Promise<void> {
		await this.repository.delete(id);
	}
}

export default TodoUseCase;
