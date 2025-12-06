"use client";

import { useEffect, useState } from "react";
import { CoffeeProps } from "@/types/CoffeeProps";
import { distanceInMiles } from "@/lib/distanceInMiles";
import CoffeePost from "@/app/components/CoffeePost";

async function geocode(address: string) {
    const res = await fetch("/api/geocode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
    });

    const data = await res.json();
    return { lat: data.lat, lon: data.lon };
}

export default function SearchPage() {
    const [coffees, setCoffees] = useState<CoffeeProps[]>([]);
    const [address, setAddress] = useState("");
    const [miles, setMiles] = useState(5);
    const [results, setResults] = useState<Array<{ post: CoffeeProps; dist: number }>>([]);

    useEffect(() => {
        fetch("/api/coffees")
            .then((res) => res.json())
            .then((data) => setCoffees(data));
    }, []);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const origin = await geocode(address);
        const pairs = await Promise.all(
            coffees.map(async (post) => {
                const dest = await geocode(post.location);
                const dist = distanceInMiles(origin, dest);
                return { post, dist };
            })
        );
        const nearby = pairs.filter((p) => p.dist <= miles).sort((a, b) => a.dist - b.dist);
        setResults(nearby);
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
