import Todo from '../../domain/entities/Todo';

interface ITodoRepository {
	findAll: () => Promise<Todo[]>;
	findById: (id: string) => Promise<Todo | null>;
	create: (todo: Todo) => Promise<Todo>;
	update: (id: string, todo: Partial<Todo>) => Promise<Todo | null>;
	delete: (id: string) => Promise<boolean>;
}

export default ITodoRepository;

