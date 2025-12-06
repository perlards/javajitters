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
        <main>
            <h1>Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                />
                <input
                    type="number"
                    value={miles}
                    onChange={(e) => setMiles(Number(e.target.value))}
                />
                <button type="submit">Search</button>
            </form>

            {results.map(({ post, dist }) => (
                <div key={post.id}>
                    <p>{dist.toFixed(1)} miles</p>
                    <CoffeePost post={post} />
                </div>
            ))}
        </main>
    );
}
