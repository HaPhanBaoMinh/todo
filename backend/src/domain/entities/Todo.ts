import { v4 as uuidv4 } from 'uuid';

class Todo {
	private id: string | null;
	private task: string;
	private completed: boolean;
	private createdAt: Date | null;

	constructor(task: string, completed: boolean = false, createdAt: Date | null = null, id: string | null = null) {
		this.createdAt = createdAt;
		this.task = task;
		this.completed = completed;
		this.id = id ? id : uuidv4();
	}

	toString = (): string => {
		return `Todo [id=${this.id}, task=${this.task}, completed=${this.completed}, createdAt=${this.createdAt}]`;
	}

	toJSON() {
		return {
			id: this.id,
			task: this.task,
			completed: this.completed,
			createdAt: this.createdAt
		};
	}

	get CreatedAt(): Date | null {
		if (this.createdAt instanceof Date) {
			return this.createdAt;
		}
		return null;

	}

	get Id(): string | null {
		return this.id
	}

	get Task(): string {
		return this.task;
	}

	get Completed(): boolean {
		return this.completed;
	}

}

export default Todo;
