import { CoffeeProps } from "@/types/CoffeeProps";
import Rating from "@mui/material/Rating";


export default function FullCoffeePost({post} : {post: CoffeeProps}){
    const divStyle = "flex flex-col ml-100 mr-100 p-5 h-[90%] rounded-2xl";
    let activeUser = true;

    if (post.user === undefined || post.user === null) {
        activeUser = false;
    }

    return(
        <div className={divStyle}>
            <h1 className={"font-bold mt-10 mb-4 text-[#452B1F] text-center text-3xl"}>{post.coffeeType}</h1>

            <div className={"flex flex-col text-left"}>
                <h2 className={"text-2xl p-2"}>{activeUser ? `${post.user}` : "Anonymous"}</h2>
                <Rating value={post.rating} readOnly={true}
                    sx={{
                        color: "#825235",
                    }}
                />
                <img className={"h-50 w-50 p-3 mx-auto"} src={post.picture} alt={`${post.coffeeType} from ${post.shopName}`}/>
                <div>
                    <h2 className={"font-bold text-xl"}>{post.shopName}</h2>
                    <h3 className={"italic pb-5 text-xl"}>{post.location}</h3>
                    <p className={"text-xl"}>{post.review}</p>
                </div>
            </div>
        </div>
    )
}