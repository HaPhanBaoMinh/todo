import { ITodoRepository } from './ITodoRepository';
import { Todo } from '../domain/Todo';
import ApiService from '../services/ApiService';
import { TodoErrorCode, TodoExpiredTimeError } from '../domain/TodoError';

class TodoApiRepository implements ITodoRepository {
	private apiService: ApiService;

	constructor(apiService: ApiService) {
		this.apiService = apiService;
	}

	async getAll(): Promise<Todo[]> {
		const response = await this.apiService.get<{ id: string; task: string; completed: boolean, createdAt: string }[]>('/todos');
		return response.data.map(
			todoData => new Todo(todoData.id, todoData.task, todoData.completed, todoData.createdAt)
		);
	}

	async create(todo: Todo): Promise<Todo> {
		const response = await this.apiService.post<{ id: string; task: string; completed: boolean, createdAt: string }>(
			'/todo',
			{
				task: todo.getTask(),
				completed: todo.isCompleted()
			}
		);
		return new Todo(response.data.id, response.data.task, response.data.completed, response.data.createdAt);
	}

	async update(id: string, todo: Partial<Todo>): Promise<Todo> {
		try {
			const response = await this.apiService.put<{ id: string; task: string; completed: boolean, message?: string, error_code?: string }>(
				`/todo/${id}`
			);

			return new Todo(response.data.id, response.data.task, response.data.completed);
		}
		catch (error: any) {
			if (error.response && error.response.data) {
				const errorCode = error.response.data.error_code;
				if (errorCode === TodoErrorCode.TODO_EXPIRED_TIME) {
					throw new TodoExpiredTimeError('The todo item has expired and cannot be updated.');
				}
			}
			// Re-throw other errors
			throw error;
		}
	}

	async delete(id: string): Promise<boolean> {
		await this.apiService.delete(`/todo/${id}`);
		return true;
	}
}

export default TodoApiRepository;
