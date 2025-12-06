import { CoffeeProps } from "@/types/CoffeeProps";
import CoffeeIcon from "@mui/icons-material/Coffee";
import Link from "next/link";

export default function CoffeePost({post}:{post:CoffeeProps}){
    const divStyle = "m-4 p-4 bg-light-brown justify-center h-[90%] rounded-2xl";
    const textStyle = "p-3 font-bold text-2xl"
    return (
        <Link href={`post/${post.id}`}>
            <div className={divStyle}>
                <div className={"flex flex-row p-3 text-[#452B1F] justify-between"}>
                    <h3 className={textStyle}>{post.coffeeType} | {post.shopName}</h3>

                    <div className={"flex flex-row items-center pr-2"}>
                        <CoffeeIcon/><h3>{ post.rating}</h3>
                    </div>
                </div>
                <img className={"max-w-auto p-3"} src={ `${post.picture}`} alt={`${post.coffeeType} from ${post.shopName}`}/>
            </div>
        </Link>
    )
}