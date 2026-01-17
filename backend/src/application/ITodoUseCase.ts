import Todo from '../domain/entities/Todo';

interface ITodoUseCase {
	getTodos: () => Promise<Todo[]>;
	getTodoById: (id: string) => Promise<Todo | null>;
	createTodo: (task: string) => Promise<Todo>;
	toggleTodo: (id: string) => Promise<Todo | null>;
	deleteTodo: (id: string) => Promise<boolean>;
}

export default ITodoUseCase
