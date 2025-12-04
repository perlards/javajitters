import getCollection, {COFFEES_COLLECTION} from "@/db";
import { CoffeeProps } from "@/types/CoffeeProps";

export default async function getAllCoffees(): Promise<CoffeeProps[]> {

    const coffeeCollection = await getCollection(COFFEES_COLLECTION)
    const data = await coffeeCollection.find().toArray();

    const coffees: CoffeeProps[] = data.map((c) => ({
        id: c._id.toHexString(),
        shopName: c.shopName,
        coffeeType: c.coffeeType,
        rating: c.rating,
        review: c.review,
        picture: c.picture,
        category: c.category,
        location: c.location,
    }));
    return coffees.reverse();
}