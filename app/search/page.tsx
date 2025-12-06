"use client";

import { useEffect, useState } from "react";
import { CoffeeProps } from "@/types/CoffeeProps";
import { distanceInMiles } from "@/lib/distanceInMiles";
import CoffeePost from "@/app/components/CoffeePost";

async function geocode(address: string) {
    try {
        const res = await fetch("/api/geocode", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({address}),
        });
        if (!res.ok) {
            console.error("geocode fetch error", await res.text());
            return null;
        }
        const data = await res.json();
        return {lat: data.lat, lon: data.lon};
    } catch (error) {
        console.error("geocoding error:", error);
        return null;
    }
}

export default function SearchPage() {
    const [coffees, setCoffees] = useState<CoffeeProps[]>([]);
    const [address, setAddress] = useState("");
    const [miles, setMiles] = useState(5);
    const [results, setResults] = useState<Array<{ post: CoffeeProps; dist: number }>>([]);
    const [status, setStatus] = useState("");
    useEffect(() => {
        fetch("/api/coffees")
            .then((res) => res.json())
            .then((data) => setCoffees(data));
    }, []);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setStatus("Searching...");
        try {


            const origin = await geocode(address);
            if (!origin) {
                setStatus("Could not find a location for that address");
                return;
            }
            const pairs = await Promise.all(
                coffees.map(async (post) => {
                    if (!post.location?.trim()) return null;
                    const dest = await geocode(post.location);
                    if (!dest) return null;
                    const dist = distanceInMiles(origin, dest);
                    return {post, dist};
                })
            );
            const nearby = pairs
                .filter((p): p is { post: CoffeeProps; dist: number } => p !== null && p.dist <= miles)
                .sort((a, b) => a.dist - b.dist);
            setResults(nearby);
        } catch (error) {
            console.error("Search error:", error);
            setStatus("Search failed.");
            setResults([]);
        }
    }

    return (
        <main className="flex flex-col items-center px-4">
            <h1 className="text-3xl font-bold mt-10 mb-4 text-[#452B1F]">Search Nearby Reviews</h1>
            <form onSubmit={handleSearch} className="flex flex-col gap-2 mb-6 w-full max-w-md">
                <input
                    className="border p-2 rounded text-[#452B1F]"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                />
                <input
                    type="number"
                    className="border p-2 rounded text-[#452B1F]"
                    value={miles}
                    onChange={(e) => setMiles(Number(e.target.value))}
                />
                <button type="submit" className="bg-[#452B1F] text-white px-4 py-2 rounded">Search</button>
            </form>
            {status && <p className="mb-4 text-[#452B1F] font-medium">{status}</p>}
            <div className="flex flex-col items-center w-full">
                {results.map(({ post, dist }) => (
                    <div key={post.id} className="border p-4 mb-4 rounded w-full max-w-lg text-[#452B1F] bg-white/70">
                        <p className="mb-1"><strong>{dist.toFixed(1)} miles away</strong></p>
                        <CoffeePost post={post} />
                    </div>
                ))}
            </div>
        </main>
    );
}
