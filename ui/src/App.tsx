import useTodoApp from './application/useTodoApp';
import TodoItem from './components/TodoItem';

function App() {
	const { todos, addNewTodo, deleteTodo, toggleTodo } = useTodoApp();

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const input = form.querySelector('input');
		if (input) {
			addNewTodo(input.value);
			input.value = '';
		}
	};

	return (
		<div className="container py-4 bg-light min-vh-100 border">
			<h1 className="my-4 text-center text-bold">TODO</h1>

			<form className="mb-3" onSubmit={e => onSubmit(e)}>
				<div className="row justify-content-center g-2">
					<div className="col-10 col-md-8 col-lg-6">
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder="Add your task..."
							/>
							<button type="submit" className="btn btn-primary">
								+
							</button>
						</div>
					</div>
				</div>
			</form>
			<hr />
			{todos.getAllTodo().map(todo => (
				<TodoItem
					key={todo.getId()}
					task={todo.getTask()}
					completed={todo.isCompleted()}
					onDeleteCallback={() => deleteTodo(todo.getId())}
					onToggleCompleteCallback={() => toggleTodo(todo.getId())}
				/>
			))}
		</div >
	);
}

export default App;

