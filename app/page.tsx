'use client';
import { useEffect, useState } from 'react';
import {CoffeeProps} from "@/types/CoffeeProps";
import PostDisplay from "@/app/components/PostDisplay";
import getAllCoffees from "@/lib/getAllCoffees";

export default function HomePage() {
    const [posts, setPosts] = useState< CoffeeProps[]>([]);

    useEffect(() => {
        async function getPostsHome(){
            try{
                const newData = await getAllCoffees();
                console.log(newData);
                setPosts(newData);
            }catch(error){
                console.log(error);
            }
        }
        getPostsHome().then()
    }, [])

    return (
        <main>
            <h1 className={"text-4xl font-bold mb-12 text-[#452B1F] mt-10 text-center"}>Java Jitters</h1>
            <PostDisplay inputPosts={posts}/>
        </main>
    );
}
