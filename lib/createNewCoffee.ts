"use server";
import getCollection, {COFFEES_COLLECTION} from "@/db"
import { CoffeeProps } from "@/types/CoffeeProps"

export default async function createNewCoffee(
    data: {
        shopName: string;
        coffeeType: string;
        rating: number;
        review: string;
        picture: string;
        category: string;
        location: string;
    }):Promise<CoffeeProps> {
    console.log("Creating new coffee...");

    const { shopName, coffeeType, rating, review, picture, category, location } = data;

    const newCoffee = { shopName, coffeeType, rating, review, picture, category, location };

    const coffeeCollection = await getCollection(COFFEES_COLLECTION);

    const res = await coffeeCollection.insertOne({...newCoffee});

    if (!res.acknowledged) {
        throw new Error("DB insert failed")
    }
    return {...newCoffee, id: res.insertedId.toHexString()};
}
