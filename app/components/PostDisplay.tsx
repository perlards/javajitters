"use client";

import { CoffeeProps } from "@/types/CoffeeProps";
import CoffeePost from "@/app/components/CoffeePost";

export default function PostDisplay({inputPosts}:{inputPosts:CoffeeProps[]}){
    const posts = inputPosts;
    const styleDiv = "flex flex-col overflow-scroll auto lg:grid grid-cols-3 overflow-scroll auto"


    return (
        <div className={styleDiv}>
            {posts.map((p) =>
                <CoffeePost key={p.id} post={p}/>
            )}
        </div>
    )

}