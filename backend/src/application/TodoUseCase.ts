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

	async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo | null> {
		return this.todoRepository.update(id, todo);
	}

	async deleteTodo(id: string): Promise<boolean> {
		return this.todoRepository.delete(id);
	}
}

export default TodoUseCase;
