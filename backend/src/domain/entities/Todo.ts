import { v4 as uuidv4 } from 'uuid';


class Todo {
	private id: string
	private task: string;
	private completed: boolean;

	constructor(task: string, id: string = '', completed: boolean = false) {
		this.id = id || uuidv4();
		this.task = task;
		this.completed = completed;
	}

	toString = (): string => {
		return `Todo [id=${this.id}, task=${this.task}, completed=${this.completed}]`;
	}

	get Id(): string {
		return this.id;
	}

	get Task(): string {
		return this.task;
	}

	get Completed(): boolean {
		return this.completed;
	}

}

export default Todo;
