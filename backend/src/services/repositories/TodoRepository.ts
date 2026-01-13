import ITodoRepository from './ITodoRepository';
import IDatabase from '../db/IDatabase';
import Todo from '../../domain/entities/Todo';
import { ObjectId } from 'mongodb';

interface TodoDocument {
	_id: ObjectId;
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
			return todos.map(doc => {
				const _idString = doc._id.toHexString();
				return new Todo(doc.task, _idString, doc.completed);
			})
		} catch (error) {
			console.error('Error fetching todos:', error);
			return [];
		}

	}

	async findById(id: string): Promise<Todo | null> {
		try {
			const todo = await this.dbService.findOne<TodoDocument>(
				this.collectionName,
				{
					_id: new ObjectId(id)
				}
			);

			if (!todo) {
				return null;
			}

			const _idString = todo._id.toHexString();
			return new Todo(todo.task, _idString, todo.completed);
		} catch (error) {
			console.error('Error finding todo by id:', error);
			return null;
		}
	}

	async create(todo: Todo): Promise<Todo> {
		const document: TodoDocument = {
			_id: new ObjectId(),
			task: todo.Task,
			completed: todo.Completed
		};

		const result = await this.dbService.insertOne<TodoDocument>(
			this.collectionName,
			document
		);

		const _idString = result._id.toHexString();

		return new Todo(result.task, _idString, result.completed);
	}

	async update(id: string, todoUpdate: Partial<Todo>): Promise<Todo | null> {
		try {
			const updateDoc: any = { $set: {} };
			
			// Check if todoUpdate is a Todo instance or a plain object
			if (todoUpdate instanceof Todo) {
				if (todoUpdate.Task !== undefined) {
					updateDoc.$set.task = todoUpdate.Task;
				}
				if (todoUpdate.Completed !== undefined) {
					updateDoc.$set.completed = todoUpdate.Completed;
				}
			} else {
				// Handle plain object updates
				if ((todoUpdate as any).task !== undefined) {
					updateDoc.$set.task = (todoUpdate as any).task;
				}
				if ((todoUpdate as any).completed !== undefined) {
					updateDoc.$set.completed = (todoUpdate as any).completed;
				}
			}

			const result = await this.dbService.updateOne<TodoDocument>(
				this.collectionName,
				{ _id: new ObjectId(id) },
				updateDoc
			);

			if (!result) {
				return null;
			}

			const _idString = result._id.toHexString();

			return new Todo(result.task, _idString, result.completed);
		} catch (error) {
			console.error('Error updating todo:', error);
			return null;
		}
	}

	async delete(id: string): Promise<boolean> {
		try {
			return await this.dbService.deleteOne<TodoDocument>(
				this.collectionName,
				{ _id: new ObjectId(id) }
			);
		} catch (error) {
			console.error('Error deleting todo:', error);
			return false;
		}
	}
}

export default TodoRepository;
