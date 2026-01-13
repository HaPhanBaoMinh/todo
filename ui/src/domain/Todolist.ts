import { Todo } from './Todo';

export class TodoList {
	private todos: Todo[];

	constructor(todos: Todo[] = []) {
		this.todos = todos;
	}

	addTodo(todo: Todo): void {
		this.todos.push(todo);
	}

	removeTodo(id: string): void {
		this.todos = this.todos.filter(todo => todo.getId() !== id);
	}

	getTodo(id: string): Todo | undefined {
		return this.todos.find(todo => todo.getId() === id);
	}

	getAllTodo(): Todo[] {
		return [...this.todos];
	}
}
