interface TodoItemProps {
	task: string;
	completed: boolean;
	onDelete: () => void;
	onToggleComplete: () => void;
}

function TodoItem(props: TodoItemProps) {
	return (
		<div className="row justify-content-center mb-2" >
			<div className="col-10 col-md-8 col-lg-6">
				<div className="d-flex align-items-center item-card p-2 border shadow-sm">

					<span
						className={
							"flex-grow-1 ps-2" +
							(props.completed
								? " text-decoration-line-through text-secondary"
								: "")
						}
					>
						{props.task}
					</span>

					<button
						onClick={props.onDelete}
						className="btn me-2 btn-sm btn-outline-danger">
						Delete
					</button>

					<button
						onClick={props.onToggleComplete}
						className={
							"btn btn-sm " +
							(props.completed ? "btn-success" : "btn-outline-success")
						}
					>
						Done
					</button>

				</div>
			</div>
		</div>
	);
}

export default TodoItem;

