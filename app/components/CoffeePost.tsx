import { CoffeeProps } from "@/types/CoffeeProps";
import Link from "next/link";

export default function CoffeePost({post}:{post:CoffeeProps}){
    return (
        <Link href={`post/${post.id}`}>
            <div>
                <h4>{post.coffeeType} | {post.shopName}</h4>
                <img src={`${post.picture}`} alt={`${post.coffeeType} from ${post.shopName}`}/>
            </div>
        </Link>
    )
}