'use client';
import { useEffect, useState } from 'react';
import getAllPosts from "@/app/lib/getAllPosts";
import {CoffeeProps} from "@/types/CoffeeProps";
import PostDisplay from "@/app/components/PostDisplay";

export default function HomePage() {
    const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [testLocation, setTestLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [posts, setPosts] = useState< CoffeeProps[]>([]);

    const testAddress = "700 Commonwealth Avenue, Boston, MA";

    useEffect(() => {
        getPostsHome()

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

    async function getPostsHome(){
        try{
            const newData = await getAllPosts();

            setPosts(newData);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <main>
            <h1>JavaJitters</h1>
            {userLocation && (
                <p>
                    YOUR LOCATION IS: {userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)}
                </p>
            )}
            {testLocation && (
                <p>
                    TEST LOCATION IS: {testLocation.lat.toFixed(4)}, {testLocation.lon.toFixed(4)}
                </p>
            )}
            <PostDisplay inputPosts={posts}/>
        </main>
    );
}
