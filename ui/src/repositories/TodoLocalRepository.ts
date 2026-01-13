import { ITodoRepository } from './ITodoRepository';
import { Todo } from '../domain/Todo';
import LocalStorageService from '../services/LocalStorageService';

class TodoLocalRepository implements ITodoRepository {
	private storageKey: string = 'todos';

	async getAll(): Promise<Todo[]> {
		const storedTodos = LocalStorageService.load<{ id: string; task: string; completed: boolean }[]>(this.storageKey);
		if (storedTodos) {
			return storedTodos.map(
				todoData => new Todo(todoData.id, todoData.task, todoData.completed)
			);
		}
		return [];
	}

	async create(todo: Todo): Promise<Todo> {
		const todos = await this.getAll();
		todos.push(todo);
		this.saveAll(todos);
		return todo;
	}

	async update(id: string, updatedTodo: Partial<Todo>): Promise<Todo> {
		const todos = await this.getAll();
		const index = todos.findIndex(todo => todo.getId() === id);

		if (index === -1) {
			throw new Error(`Todo with id ${id} not found`);
		}

		// Update the todo
		const todo = todos[index];
		if (updatedTodo instanceof Todo) {
			todos[index] = updatedTodo;
		}

		this.saveAll(todos);
		return todos[index];
	}

	async delete(id: string): Promise<boolean> {
		const todos = await this.getAll();
		const filteredTodos = todos.filter(todo => todo.getId() !== id);
		this.saveAll(filteredTodos);
		return true;
	}

	private saveAll(todos: Todo[]): void {
		LocalStorageService.save(this.storageKey, todos);
	}
}

export default TodoLocalRepository;
