import { TodoList } from '../domain/Todolist'
import { useEffect, useState } from 'react'
import ApiService from '../services/ApiService'
import TodoUseCase from '../application/TodoUseCase'
import TodoApiRepository from '../repositories/TodoApiRepository'
import TodoLocalRepository from '../repositories/TodoLocalRepository'

// Initialize services and use case outside the hook to avoid re-creation
const apiService = new ApiService(process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000/api')
const apiRepository = new TodoApiRepository(apiService)
const localRepository = new TodoLocalRepository()

// Use API repository by default, can switch to localRepository if needed
const todoUseCase = new TodoUseCase(apiRepository)

function useTodoApp() {
	const [todos, setTodos] = useState<TodoList>(new TodoList())
	const [isLoading, setIsLoading] = useState<boolean>(false)

	// Load todos on initial render 
	useEffect(() => {
		fetchTodos()
	}, [])

	const fetchTodos = async () => {
		try {
			setIsLoading(true)
			const todoList = await todoUseCase.getTodos()
			setTodos(todoList)
		} catch (error) {
			console.error('Error fetching todos:', error)
			// Fallback to local storage if API fails
			const localUseCase = new TodoUseCase(localRepository)
			const todoList = await localUseCase.getTodos()
			setTodos(todoList)
		} finally {
			setIsLoading(false)
		}
	}

	const addNewTodo = async (task: string) => {
		if (!task.trim()) return

		try {
			const newTodo = await todoUseCase.addTodo(task)
			// Optimistic update: add to state immediately without refetching
			const updatedList = new TodoList([...todos.getAllTodo(), newTodo])
			setTodos(updatedList)
		} catch (error) {
			console.error('Error adding todo:', error)
			// Revert on error by refetching
			await fetchTodos()
		}
	}

	const deleteTodo = async (id: string) => {
		// Save current state for rollback
		const previousTodos = todos

		try {
			// Optimistic update: remove from state immediately
			const updatedList = new TodoList(
				todos.getAllTodo().filter(todo => todo.getId() !== id)
			)
			setTodos(updatedList)

			// Sync with API in background
			await todoUseCase.deleteTodo(id)
		} catch (error) {
			console.error('Error deleting todo:', error)
			// Rollback on error
			setTodos(previousTodos)
		}
	}

	const toggleTodo = async (id: string) => {
		// Save current state for rollback
		const previousTodos = todos

		try {
			// Optimistic update: toggle in state immediately
			const updatedTodos = todos.getAllTodo().map(todo => {
				if (todo.getId() === id) {
					todo.toggle()
				}
				return todo
			})
			setTodos(new TodoList(updatedTodos))

			// Sync with API in background
			await todoUseCase.toggleTodo(id)
		} catch (error) {
			console.error('Error toggling todo:', error)
			// Rollback on error
			setTodos(previousTodos)
		}
	}

	return { todos, addNewTodo, deleteTodo, toggleTodo, isLoading }
}

export default useTodoApp
