import FullCoffeePost from "@/app/components/FullCoffeePost";
import getPostById from "@/app/lib/getPostById";
import { redirect } from "next/navigation";

export default async function FullPostPage({params}:{params:Promise<{id:string}>}){
    const {id} = await params;

    let post = null;

    try{
        post = await getPostById(id);
    }catch(error){
        console.log(error);
        redirect("/");
    }

    if(!post){
        redirect("/");
    }

    return <FullCoffeePost post={post}/>
}
