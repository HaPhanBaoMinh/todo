import Todo from '../domain/entities/Todo';

interface ITodoUseCase {
	getTodos: () => Promise<Todo[]>;
	getTodoById: (id: string) => Promise<Todo | null>;
	createTodo: (todo: Todo) => Promise<Todo>;
	updateTodo: (id: string, todo: Partial<Todo>) => Promise<Todo | null>;
	deleteTodo: (id: string) => Promise<boolean>;
}

export default ITodoUseCase
