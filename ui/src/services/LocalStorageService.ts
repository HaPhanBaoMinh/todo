class LocalStorageService {
	static save(key: string, value: any): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static load<T>(key: string): T | null {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) as T : null;
	}

	static remove(key: string): void {
		localStorage.removeItem(key);
	}
}

export default LocalStorageService;
