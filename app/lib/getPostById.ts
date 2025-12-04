import getCollection, { POST_COLLECTION } from "...";
import { ObjectId } from "mongodb";
import { CoffeeProps } from "@/types/CoffeeProps";

export default async function getPostById(id: string): Promise<CoffeeProps | null>{

    const postCollection = await getCollection(POST_COLLECTION);

    let objectId;

    try{
        objectId = new ObjectId(id);
    }catch{
        return null;
    }

    const data = await postCollection.findOne({id: objectId});

    if (data === null){
        return null;
    }

    const coffeePost = {
        id: data.id.toString(),
        shopName: data.shopName,
        coffeeType: data.coffeeType,
        rating: data.rating,
        review: data.review,
        picture: data.picture,
        category: data.category,
        location: data.location,
    }

    return coffeePost;
}