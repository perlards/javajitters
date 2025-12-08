import { CoffeeProps } from "@/types/CoffeeProps";
import CoffeeIcon from "@mui/icons-material/Coffee";
import Link from "next/link";

export default function CoffeePost({post}:{post:CoffeeProps}){
    const divStyle = "m-4 p-4 bg-light-brown justify-center h-[90%] rounded-2xl";
    const textStyle = "p-3 font-bold text-2xl"
    return (
        <Link href={`post/${post.id}`}>
            <div className={divStyle}>
                <div className={"flex flex-row px-auto text-[#452B1F] justify-between"}>
                    <h3 className={textStyle}>{post.coffeeType} | {post.shopName}</h3>

                    <div className={"flex flex-row items-center pr-2"}>
                        <CoffeeIcon/><h3>{ post.rating}</h3>
                    </div>
                </div>
                {post.picture && post.picture !== "" ? (
                    <img
                        className="h-80 w-80 p-3 mx-auto m-4 rounded"
                        src={post.picture}
                        alt={`${post.coffeeType} from ${post.shopName}`}
                    />
                ) : (
                    <p className="mt-1 w-full text-center text-[#452B1F] text-xl font-semibold rounded border border-dashed border-gray-300 p-20 mt-5 mb-5">
                        No Image Uploaded :(
                    </p>
                )}
            </div>
        </Link>
    )
}