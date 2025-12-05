"use client";
import{ useState } from "react";
import { CoffeeProps } from "@/types/CoffeeProps"
//import LinkPreview from "./LinkPreview";
import NewCoffeePost from "../components/NewCoffeePost";

export default function CoffeeDisplay(){

    const [posts, setPosts] = useState<CoffeeProps[]>([]);

    return (

        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4"> New Review! </h2>

            <NewCoffeePost append={(newPost)=> {
                setPosts([...posts, newPost])
            }}/>
            {posts.map((post) => (
                <div key={post.id} className="border p-2 mb-2 rounded w-full max-w-lg">
                    <p><strong>{post.shopName}</strong> - {post.coffeeType}</p>
                    <p>Rating: {post.rating}</p>
                    <p>{post.review}</p>
                    {post.picture && <img src={post.picture} alt={post.shopName} className="mt-1 w-full rounded" />}
                    {post.category && <p>Category: {post.category}</p>}
                    {post.location && <p>Location: {post.location}</p>}
                </div>
            ))}
        </div>
    );
}