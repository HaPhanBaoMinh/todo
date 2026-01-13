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
			// const localUseCase = new TodoUseCase(localRepository)
			const localUseCase = new TodoUseCase(apiRepository)
			const todoList = await localUseCase.getTodos()
			setTodos(todoList)
		} finally {
			setIsLoading(false)
		}
	}

	const addNewTodo = async (task: string) => {
		if (!task.trim()) return

		try {
			await todoUseCase.addTodo(task)
			await fetchTodos() // Refresh the list
		} catch (error) {
			console.error('Error adding todo:', error)
		}
	}

	const deleteTodo = async (id: string) => {
		try {
			await todoUseCase.deleteTodo(id)
			await fetchTodos() // Refresh the list
		} catch (error) {
			console.error('Error deleting todo:', error)
		}
	}

	const toggleTodo = async (id: string) => {
		try {
			await todoUseCase.toggleTodo(id)
			await fetchTodos() // Refresh the list
		} catch (error) {
			console.error('Error toggling todo:', error)
		}
	}

	return { todos, addNewTodo, deleteTodo, toggleTodo, isLoading }
}

export default useTodoApp
