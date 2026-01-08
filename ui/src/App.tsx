import useTodoApp from './application/useTodoApp';

function App() {
	const { todos } = useTodoApp();


	return (
		<div className="container py-4 bg-light min-vh-100 border">
			<h1 className="my-4 text-center text-bold">TO DO</h1>

			<form className="mb-3" onSubmit={e => {
				e.preventDefault();
				const form = e.target as HTMLFormElement;
				const input = form.querySelector('input');
			}}>
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
		</div>
	);
}

export default App;

