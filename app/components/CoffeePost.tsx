import { CoffeeProps } from "@/types/CoffeeProps";
import Link from "next/link";

export default function CoffeePost({post}:{post:CoffeeProps}){
    return (
        <Link href={`post/${post.id}`}>
            <div>
                <h3>{post.coffeeType} | {post.shopName}</h3>
                <h3>{post.rating}</h3>
                <img src={`${post.picture}`} alt={`${post.coffeeType} from ${post.shopName}`}/>
            </div>
        </Link>
    )
}