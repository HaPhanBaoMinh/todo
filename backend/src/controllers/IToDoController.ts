
interface IToDoController {
	getToDos: (req: any, res: any) => Promise<void>;
	// getToDoById: (req: any, res: any) => Promise<void>;
	createToDo: (req: any, res: any) => Promise<void>;
	// updateToDo: (req: any, res: any) => Promise<void>;
	// deleteToDo: (req: any, res: any) => Promise<void>;
}

export default IToDoController;
