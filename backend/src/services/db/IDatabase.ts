import { Filter, UpdateFilter, Document, WithId, OptionalUnlessRequiredId } from 'mongodb';

interface IDatabase {
	connect: () => Promise<any>;
	disconnect: () => Promise<any>;
	checkConnection: () => Promise<void>;
	findMany: <T extends Document = Document>(collection: string, filter?: Filter<T>) => Promise<WithId<T>[]>;
	findOne: <T extends Document = Document>(collection: string, filter: Filter<T>) => Promise<WithId<T> | null>;
	insertOne: <T extends Document = Document>(collection: string, document: OptionalUnlessRequiredId<T>) => Promise<WithId<T>>;
	updateOne: <T extends Document = Document>(collection: string, filter: Filter<T>, update: UpdateFilter<T>) => Promise<WithId<T> | null>;
	deleteOne: <T extends Document = Document>(collection: string, filter: Filter<T>) => Promise<boolean>;
}

export default IDatabase;
