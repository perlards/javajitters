import { MongoClient, Db, Collection } from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is undefined");
}

export const DB_NAME = "JavaJitters";
export const COFFEES_COLLECTION = "Coffees";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();

        db = client.db(DB_NAME);
        // makes sure no two ids match
        await db
            .collection(COFFEES_COLLECTION)
            .createIndex({ shopName: 1, coffeeType: 1 }, { unique: true });
    }
    return db!;
}

export default async function getCollection(
    collectionName: string,
): Promise<Collection> {
    if (!db) {
        db = await connect();
    }
    return db.collection(collectionName);
}
