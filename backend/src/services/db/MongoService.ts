import { MongoClient, Db, WithId, Filter, OptionalId, UpdateFilter, Document, OptionalUnlessRequiredId } from 'mongodb';
import IDatabase from './IDatabase';

class MongoService implements IDatabase {
	private client: MongoClient;
	private db: Db | null = null;

	constructor(private uri: string, private dbName: string) {
		this.client = new MongoClient(uri, {
			connectTimeoutMS: 10000,
		});
	}

	async connect(): Promise<Db> {
		try {
			await this.client.connect();
			this.db = this.client.db(this.dbName);
			console.log('Connected to MongoDB');
			return this.db;
		} catch (error) {
			console.error('Failed to connect to MongoDB:', error);
			throw error;
		}
	}

	async disconnect() {
		await this.client.close();
		this.db = null;
	}

	private getDb(): Db {
		if (!this.db) throw new Error('MongoDB not connected');
		return this.db;
	}

	async checkConnection(): Promise<void> {
		try {
			await this.client.db('admin').command({ ping: 1 });
		} catch (error) {
			throw new Error('MongoDB connection check failed');
		}
	}

	async findMany<T extends Document = Document>(collection: string, filter: Filter<T> = {}): Promise<WithId<T>[]> {
		return this.getDb()
			.collection<T>(collection)
			.find(filter)
			.toArray();
	}

	async findOne<T extends Document = Document>(collection: string, filter: Filter<T>): Promise<WithId<T> | null> {
		return this.getDb()
			.collection<T>(collection)
			.findOne(filter);
	}

	async insertOne<T extends Document = Document>(collection: string, document: OptionalUnlessRequiredId<T>): Promise<WithId<T>> {
		const result = await this.getDb()
			.collection<T>(collection)
			.insertOne(document);

		const insertedDoc = await this.getDb()
			.collection<T>(collection)
			.findOne({ _id: result.insertedId } as Filter<T>);

		if (!insertedDoc) {
			throw new Error('Failed to retrieve inserted document');
		}

		return insertedDoc;
	}

	async updateOne<T extends Document = Document>(
		collection: string,
		filter: Filter<T>,
		update: UpdateFilter<T>
	): Promise<WithId<T> | null> {
		const result = await this.getDb()
			.collection<T>(collection)
			.findOneAndUpdate(filter, update, { returnDocument: 'after' });
		return result;
	}

	async deleteOne<T extends Document = Document>(collection: string, filter: Filter<T>): Promise<boolean> {
		const result = await this.getDb()
			.collection<T>(collection)
			.deleteOne(filter);
		return result.deletedCount > 0;
	}
}

export default MongoService;
