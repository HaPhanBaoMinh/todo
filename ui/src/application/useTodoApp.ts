import { Todo } from '../domain/todo'
import { TodoList } from '../domain/todolist'
import { useState } from 'react'

function useTodoApp() {
	const [todos, setTodos] = useState<TodoList>(new TodoList())

	const addNewTodo = (task: string) => {
		if (!task.trim()) return
		const newTask = Todo.create(task)

		const updatedList = new TodoList([todos.getAllTodo(), newTask].flat())

		// Bussiness logic
		setTodos(updatedList)
	}

	const deleteTodo = (id: string) => {
		const updatedList = new TodoList(
			todos.getAllTodo().filter(todo => todo.getId() !== id)
		)

		// Bussiness logic
		setTodos(updatedList)
	}

	const toggleTodo = (id: string) => {
		const updatedTodos = todos.getAllTodo().map(todo => {
			if (todo.getId() === id) {
				todo.toggle()
			}
			return todo
		})

		// Bussiness logic
		setTodos(new TodoList(updatedTodos))
	}

	return { todos, addNewTodo, deleteTodo, toggleTodo }
}

export default useTodoApp
