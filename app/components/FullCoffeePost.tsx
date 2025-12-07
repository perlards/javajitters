import { CoffeeProps } from "@/types/CoffeeProps";
import Rating from "@mui/material/Rating";



export default function FullCoffeePost({post} : {post: CoffeeProps}){
    const divStyle = "flex flex-col  p-5  rounded-2xl";
    let activeUser = true;

    if (post.user === undefined || post.user === null) {
        activeUser = false;
    }

    return(
        <div className={divStyle}>
            <div className="bg-[#C19A6B] rounded-2xl p-6 shadow-lg w-full  max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-10 mb-10">

                <h1 className={"font-bold mt-10 mb-4 text-[#452B1F] text-center text-4xl"}>{post.shopName}</h1>
                <h2 className={"italic text-center pb-5 text-xl"}>{post.location}</h2>

                <div className={"flex flex-col text-left"}>
                    <h2 className={"text-2xl p-2"}>{activeUser ? `${post.user}` : "Anonymous"}</h2>
                    <Rating value={post.rating} readOnly={true}
                            sx={{
                                color: "#825235",
                            }}
                    />
                    <img className={"h-80 w-80 p-3 mx-auto m-4"} src={post.picture} alt={`${post.coffeeType} from ${post.shopName}`}/>
                    <div>
                        <h2 className={"font-bold text-3xl"}>{post.coffeeType}</h2>
                        <p className={"text-2xl mb-10"}>{post.review}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}