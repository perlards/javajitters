import { CoffeeProps } from "@/types/CoffeeProps";
import Rating from "@mui/material/Rating";


export default function FullCoffeePost({post} : {post: CoffeeProps}){
    let activeUser = true;

    if (post.user === undefined || post.user === null) {
        activeUser = false;
    }

    return(
        <div>
            <h2>{post.coffeeType}</h2>
            <h2>{activeUser ? `${post.user}` : "Anonymous"}</h2>
            <Rating value={post.rating} readOnly={true}/>
            <img src={post.picture} alt={`${post.coffeeType} from ${post.shopName}`}/>
            <h4>{post.shopName}</h4>
            <h4>{post.location}</h4>
            <p>{post.review}</p>
        </div>
    )
}