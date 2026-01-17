import { v4 as uuidv4 } from 'uuid';

export class Todo {
	private id: string;
	private task: string;
	private completed: boolean;
	private createdAt: Date | null;

	constructor(id: string, task: string, completed: boolean = false, createdAt: Date | string | null = null) {
		this.id = id;
		this.task = task;
		this.completed = completed;

		if (createdAt instanceof Date) {
			this.createdAt = createdAt;
		} else if (typeof createdAt === 'string') {
			this.createdAt = new Date(createdAt);
		} else {
			this.createdAt = null;
		}
	}

	getCreatedAt(): string {
		if (this.createdAt instanceof Date) {
			return this.createdAt.toLocaleDateString(undefined, {
				year: "numeric",
				month: "short",
				day: "numeric",
			});
		}

		return this.createdAt === null ? "-" : this.createdAt;
	}

	setCreatedAt(date: Date | string): void {
		if (typeof date === 'string') {
			this.createdAt = new Date(date);
			return;
		}
		this.createdAt = date;
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
