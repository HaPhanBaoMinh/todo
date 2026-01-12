import ITodoRepository from './ITodoRepository';
import IDatabase from '../db/IDatabase';
import Todo from '../../domain/entities/Todo';

interface TodoDocument {
	id: string;
	task: string;
	completed: boolean;
}

class TodoRepository implements ITodoRepository {
	private dbService: IDatabase;
	private collectionName = 'todos';

	constructor(dbService: IDatabase) {
		this.dbService = dbService;
	}

	async findAll(): Promise<Todo[]> {
		try {
			const todos = await this.dbService.findMany<TodoDocument>(this.collectionName);
			return todos.map(doc => new Todo(doc.task, doc.id, doc.completed));
		} catch (error) {
			console.error('Error fetching todos:', error);
			return [];
		}

	}

	async findById(id: string): Promise<Todo | null> {
		const numericId = parseInt(id, 10);
		if (isNaN(numericId)) {
			return null;
		}

		const todo = await this.dbService.findOne<TodoDocument>(
			this.collectionName,
			{ id: numericId } as any
		);

		if (!todo) {
			return null;
		}

		return new Todo(todo.id, todo.task, todo.completed);
	}

	async create(todo: Todo): Promise<Todo> {
		const document: TodoDocument = {
			id: todo.Id,
			task: todo.Task,
			completed: todo.Completed
		};

		const result = await this.dbService.insertOne<TodoDocument>(
			this.collectionName,
			document
		);

		return new Todo(result.id, result.task, result.completed);
	}

	async update(id: string, todoUpdate: Partial<Todo>): Promise<Todo | null> {
		const numericId = parseInt(id, 10);
		if (isNaN(numericId)) {
			return null;
		}

		const updateDoc: any = { $set: {} };
		if (todoUpdate.Task !== undefined) {
			updateDoc.$set.task = todoUpdate.Task;
		}
		if (todoUpdate.Completed !== undefined) {
			updateDoc.$set.completed = todoUpdate.Completed;
		}

		const result = await this.dbService.updateOne<TodoDocument>(
			this.collectionName,
			{ id: numericId } as any,
			updateDoc
		);

		if (!result) {
			return null;
		}

		return new Todo(result.id, result.task, result.completed);
	}

	async delete(id: string): Promise<boolean> {
		const numericId = parseInt(id, 10);
		if (isNaN(numericId)) {
			return false;
		}

		return await this.dbService.deleteOne<TodoDocument>(
			this.collectionName,
			{ id: numericId } as any
		);
	}
}

export default TodoRepository;
