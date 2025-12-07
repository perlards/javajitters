'use client';
import { useEffect, useState } from 'react';
import {CoffeeProps} from "@/types/CoffeeProps";
import PostDisplay from "@/app/components/PostDisplay";
import {distanceInMiles} from "@/lib/distanceInMiles";
import getAllCoffees from "@/lib/getAllCoffees";

export default function HomePage() {
    const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [testLocation, setTestLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [posts, setPosts] = useState< CoffeeProps[]>([]);
    const pStyle = "pt-5 pl-5 text-xl";

    const testAddress = "700 Commonwealth Avenue, Boston, MA";

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

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setUserLocation({ lat: latitude, lon: longitude });
                },
                (err) => {
                    console.error("Location error:", err);
                }
           );
        }

        async function fetchTestLocation() {
            try {
                const res = await fetch('/api/geocode', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({ address: testAddress }),
                });

                if (!res.ok) throw new Error("Failed to fetch geocode");

               const data = await res.json();
                setTestLocation({ lat: data.lat, lon: data.lon });
            } catch (error) {
                console.error("Geocoding failed:", error);
            }
        }

        fetchTestLocation();
    }, [testAddress]);



    return (
        <main>
            <h1 className={"text-4xl font-bold mb-12 text-[#452B1F] mt-10 text-center"}>Java Jitters</h1>
            { userLocation && (
                <p className={pStyle}>
                    YOUR LOCATION IS: {userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)}
                </p>
            )}
            {testLocation && (
                <p className={pStyle}>
                    TEST LOCATION IS: {testLocation.lat.toFixed(4)}, {testLocation.lon.toFixed(4)}
                </p>
            )}
            {userLocation && testLocation && (
                <p className={pStyle}>
                    DISTANCE BETWEEN USER AND TEST: {distanceInMiles(userLocation, testLocation).toFixed(2)} miles
                </p>
            )}
            <PostDisplay inputPosts={posts}/>
        </main>
    );
}
