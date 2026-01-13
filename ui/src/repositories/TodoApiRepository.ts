import { ITodoRepository } from './ITodoRepository';
import { Todo } from '../domain/Todo';
import ApiService from '../services/ApiService';

class TodoApiRepository implements ITodoRepository {
	private apiService: ApiService;

	constructor(apiService: ApiService) {
		this.apiService = apiService;
	}

	async getAll(): Promise<Todo[]> {
		const response = await this.apiService.get<{ id: string; task: string; completed: boolean }[]>('/todos');
		return response.data.map(
			todoData => new Todo(todoData.id, todoData.task, todoData.completed)
		);
	}

	async create(todo: Todo): Promise<Todo> {
		const response = await this.apiService.post<{ id: string; task: string; completed: boolean }>(
			'/todo',
			{
				task: todo.getTask(),
				completed: todo.isCompleted()
			}
		);
		return new Todo(response.data.id, response.data.task, response.data.completed);
	}

	async update(id: string, todo: Partial<Todo>): Promise<Todo> {
		const response = await this.apiService.put<{ id: string; task: string; completed: boolean }>(
			`/todo/${id}`
		);
		return new Todo(response.data.id, response.data.task, response.data.completed);
	}

	async delete(id: string): Promise<boolean> {
		await this.apiService.delete(`/todo/${id}`);
		return true;
	}
}

export default TodoApiRepository;
