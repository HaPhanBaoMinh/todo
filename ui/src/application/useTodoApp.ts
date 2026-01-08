import { Todo } from '../domain/todo'
import { TodoList } from '../domain/todolist'
import { useState } from 'react'

function useTodoApp() {
	const [todos, setTodos] = useState<TodoList>(new TodoList())

	const addNewTodo = (task: string) => {
		if (!task.trim()) return
		const newTask = Todo.create(task)

		const updatedList = new TodoList([todos.getAllTodo(), newTask].flat())
		setTodos(updatedList)
	}

	return { todos, addNewTodo }
}

export default useTodoApp
