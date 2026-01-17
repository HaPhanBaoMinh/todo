import { ExtendableError } from "ts-error";

interface ErrorTodo {
	code: string;
	message: string;  // include message so the interface matches an error
}

class TodoExpiredTimeError extends ExtendableError implements ErrorTodo {
	code: string;

	constructor(message: string) {
		super(message);
		this.name = "TodoExpiredTimeError";
		this.code = "TODO_EXPIRED_TIME";
	}
}

enum TodoErrorCode {
	TODO_EXPIRED_TIME = "TODO_EXPIRED_TIME",
}

export { TodoExpiredTimeError, TodoErrorCode };

