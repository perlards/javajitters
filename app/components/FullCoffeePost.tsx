'use client';

import { useEffect, useState } from 'react';
import { CoffeeProps } from "@/types/CoffeeProps";
import Rating from "@mui/material/Rating";
import { distanceInMiles } from "@/lib/distanceInMiles";

export default function FullCoffeePost({ post }: { post: CoffeeProps }) {
    const divStyle = "flex flex-col p-5 rounded-2xl";
    let activeUser = true;

    const [userLoc, setUserLoc] = useState<{ lat: number; lon: number } | null>(null);
    const [shopLoc, setShopLoc] = useState<{ lat: number; lon: number } | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

    if (post.user === undefined || post.user === null) {
        activeUser = false;
    }

    useEffect(() => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (pos) => setUserLoc({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            (err) => console.error("Geolocation error:", err)
        );
    }, []);

    useEffect(() => {
        async function geocode() {
            if (!post.location) return;
            try {
                const res = await fetch("/api/geocode", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ address: post.location }),
                });
                if (!res.ok) {
                    console.error("Geocoding failed:", await res.text());
                    return;
                }
                const data = await res.json();
                setShopLoc({ lat: data.lat, lon: data.lon });
            } catch (e) {
                console.error("Geocoding exception:", e);
            }
        }
        geocode();
    }, [post.location]);

    useEffect(() => {
        if (userLoc && shopLoc) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setDistance(distanceInMiles(userLoc, shopLoc));
        }
    }, [userLoc, shopLoc]);

    return (
        <div className={divStyle}>
            <div className="bg-[#C19A6B] rounded-2xl p-6 shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mt-10 mb-10">

                <h1 className="font-bold mt-10 mb-4 text-[#452B1F] text-center text-4xl">{post.shopName}</h1>
                <h2 className="italic text-center pb-1 text-xl">{post.location}</h2>
                {distance !== null && (
                    <p className="text-center text-sm italic text-[#452B1F] mb-4">
                        ~{distance.toFixed(2)} miles from you
                    </p>
                )}
                <div className="flex flex-col text-left">
                    <h2 className="text-2xl p-2">{activeUser ? `${post.user}` : "Anonymous"}</h2>
                    <Rating value={post.rating} readOnly sx={{ color: "#825235" }} />
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
                    <div>
                        <h2 className="font-bold text-3xl">{post.coffeeType}</h2>
                        <p className="text-2xl mb-10">{post.review}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}