import getCollection, {COFFEES_COLLECTION} from "@/db";
import {CoffeeProps} from "@/types/CoffeeProps";
import {ObjectId } from "mongodb";
export default async function getCoffeeById(id: string): Promise<CoffeeProps | null> {

    const coffeeCollection = await getCollection(COFFEES_COLLECTION);
    const _id = new ObjectId(id);
    const data = await coffeeCollection.findOne({ _id });

    if (!data) return null;

    return {
        id: data._id.toHexString(),
        shopName: data.shopName,
        coffeeType: data.coffeeType,
        rating: data.rating,
        review: data.review,
        picture: data.picture,
        category: data.category,
        location: data.location,
    };
}
