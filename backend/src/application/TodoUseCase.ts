import ITodoUseCase from './ITodoUseCase';
import ITodoRepository from '../services/repositories/ITodoRepository';
import Todo from '../domain/entities/Todo';

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

	async createTodo(todo: Todo): Promise<Todo> {
		return this.todoRepository.create(todo);
	}

	async toggleTodo(id: string): Promise<Todo | null> {
		const existingTodo = await this.todoRepository.findById(id);
		if (!existingTodo) {
			return null;
		}

		const updatedTodo = new Todo(
			existingTodo.Task,
			existingTodo.Id,
			!existingTodo.Completed
		);

		return this.todoRepository.update(id, updatedTodo);
	}

	async deleteTodo(id: string): Promise<boolean> {
		return this.todoRepository.delete(id);
	}
}

export default TodoUseCase;
