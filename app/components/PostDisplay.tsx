"use client";

import { CoffeeProps } from "@/types/CoffeeProps";
import CoffeePost from "@/app/components/CoffeePost";

export default function PostDisplay({inputPosts}:{inputPosts:CoffeeProps[]}){
    const posts = inputPosts;


    return (

        <div className={"flex flex-col items-center"}>
            {posts.map((p) =>
                <CoffeePost key={p.id} post={p}/>
            )}
        </div>
    )

}