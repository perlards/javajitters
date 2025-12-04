//import getCollection, { POST_COLLECTION } from "...";
import { CoffeeProps } from "@/types/CoffeeProps";

export default async function getAllPosts(): Promise<CoffeeProps[]> {
     //const postsCollection = await getCollection(POST_COLLECTION);
     //const data: CoffeeProps[] = await postsCollection.find().toArray();

     const posts: CoffeeProps[] = data.map((p)=> ({
         id: p.id.toString(),
         shopName: p.shopName,
         coffeeType: p.coffeeType,
         rating: p.rating,
         review: p.review,
         picture: p.picture,
         category: p.category,
         location: p.location,
     }));

     return posts.reverse();
}