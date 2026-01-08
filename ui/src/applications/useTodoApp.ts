import { Todo } from '../domain/todo'
import { TodoList } from '../domain/todolist'
import { useEffect, useState } from 'react'
import LocalStorageService from '../services/LocalStorageService'

function useTodoApp() {
	const [todos, setTodos] = useState<TodoList>(new TodoList())

	// Load todos from local storage on initial render 
	useEffect(() => {
		getTodosFromStorage()
	}, [])

	const addNewTodo = (task: string) => {
		if (!task.trim()) return
		const newTask = Todo.create(task)

		const updatedList = new TodoList([todos.getAllTodo(), newTask].flat())

		// Bussiness logic
		setTodos(updatedList)

		// Sroteage to local storage
		LocalStorageService.save('todos', updatedList.getAllTodo())
	}

	const deleteTodo = (id: string) => {
		const updatedList = new TodoList(
			todos.getAllTodo().filter(todo => todo.getId() !== id)
		)

		// Bussiness logic
		setTodos(updatedList)

		// Storage to local storage
		LocalStorageService.save('todos', updatedList.getAllTodo())
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

		// Storage to local storage
		LocalStorageService.save('todos', updatedTodos)
	}

	const getTodosFromStorage = () => {
		const storedTodos = LocalStorageService.load<{ id: string; task: string; completed: boolean }[]>('todos')
		if (storedTodos) {
			const todoInstances = storedTodos.map(
				todoData => new Todo(todoData.id, todoData.task, todoData.completed)
			)
			setTodos(new TodoList(todoInstances))
		}
	}

	return { todos, addNewTodo, deleteTodo, toggleTodo }
}

export default useTodoApp
