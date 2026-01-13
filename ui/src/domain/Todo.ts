import { v4 as uuidv4 } from 'uuid';

export class Todo {
	private id: string;
	private task: string;
	private completed: boolean;

	constructor(id: string, task: string, completed: boolean = false) {
		this.id = id;
		this.task = task;
		this.completed = completed;
	}

	// Getters
	getId(): string {
		return this.id;
	}

	getTask(): string {
		return this.task
	}

	isCompleted(): boolean {
		return this.completed;
	}

	// Business logic methods
	toggle(): void {
		this.completed = !this.completed;
	}

	updateTask(newTask: string): void {
		if (newTask.trim().length === 0) {
			throw new Error('Task cannot be empty');
		}
		this.task = newTask.trim();
	}

	// Factory method
	static create(task: string): Todo {
		const uuid = uuidv4();
		return new Todo(uuid, task, false);
	}
}
