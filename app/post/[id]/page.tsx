import FullCoffeePost from "@/app/components/FullCoffeePost";
import { redirect } from "next/navigation";
import getCoffeeById from "@/lib/getCoffeeById";

export default async function FullPostPage({params}:{params:Promise<{id:string}>}){
    const {id} = await params;

    let post = null;

    try{
        post = await getCoffeeById(id);
    }catch(error){
        console.log(error);
        redirect("/");
    }

    if(!post){
        redirect("/");
    }

    return <FullCoffeePost post={post}/>
}
