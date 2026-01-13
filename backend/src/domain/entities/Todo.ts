class Todo {
	private id: string | null;
	private task: string;
	private completed: boolean;

	constructor(task: string, id: string | null, completed: boolean = false) {
		this.id = id;
		this.task = task;
		this.completed = completed;
	}

	toString = (): string => {
		return `Todo [id=${this.id}, task=${this.task}, completed=${this.completed}]`;
	}

	toJSON() {
		return {
			id: this.id,
			task: this.task,
			completed: this.completed
		};
	}

	get Id(): string | null {
		return this.id
	}

	set Id(value: string | null) {
		this.id = value;
	}

	get Task(): string {
		return this.task;
	}

	get Completed(): boolean {
		return this.completed;
	}

}

export default Todo;
