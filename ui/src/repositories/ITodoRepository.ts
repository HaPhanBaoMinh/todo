import { Todo } from '../domain/Todo';

export interface ITodoRepository {
	getAll(): Promise<Todo[]>;
	create(todo: Todo): Promise<Todo>;
	update(id: string, todo: Partial<Todo>): Promise<Todo | Error>;
	delete(id: string): Promise<boolean>;
}
