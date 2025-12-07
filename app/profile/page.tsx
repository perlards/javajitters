"use client";

import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { CoffeeProps } from "@/types/CoffeeProps";
import CoffeePost from "@/app/components/CoffeePost";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const isLoadingSession = status === "loading";
    const isAuthed = status === "authenticated";

    const [posts, setPosts] = useState<CoffeeProps[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const displayName = session?.user?.name ?? session?.user?.email ?? "User";
    const displayEmail = session?.user?.email ?? "";
    const avatar = session?.user?.image || "/user-icon1.jpeg";

    useEffect(() => {
        if (!isAuthed) return;
        if (!session?.user?.email) return;
        const userEmail = session.user.email;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoadingPosts(true);
        setError(null);

        fetch("/api/coffees")
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch coffees");
                }
                const data: CoffeeProps[] = await res.json();
                const mine = data.filter((c) => c.email === userEmail);
                setPosts(mine);
            })
            .catch((err) => {
                console.error("Profile fetch error:", err);
                setError("Could not load your reviews.");
            })
            .finally(() => {
                setLoadingPosts(false);
            });
    }, [isAuthed, session?.user?.email]);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-10 mb-4 text-[#452B1F]">
                Profile
            </h1>

            {!isLoadingSession && !isAuthed && (
                <div className="flex flex-col items-center bg-[#452B1F] text-navajo-white m-5 p-8 rounded-3xl w-4/5 max-w-xl">
                    <p className="text-xl text-center mb-4">
                        You&apos;re not logged in yet.
                    </p>
                    <button
                        className="bg-toffee-brown hover:bg-[#653F29] text-navajo-white px-6 py-3 rounded-3xl text-xl"
                        onClick={() => signIn("google")}
                    >
                        Log In with Google
                    </button>
                </div>
            )}

            {isAuthed && (
                <div className="w-full flex flex-col items-center">
                    <div className="flex flex-col items-center bg-[#452B1F] text-navajo-white m-5 p-8 rounded-3xl w-4/5 max-w-xl">
                        <img
                            src={avatar}
                            alt={displayName}
                            className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-navajo-white"
                        />
                        <h2 className="text-2xl font-semibold mb-1">{displayName}</h2>
                        {displayEmail && (
                            <p className="text-lg mb-4 opacity-80">{displayEmail}</p>
                        )}

                        <button
                            className="bg-toffee-brown hover:bg-[#653F29] text-navajo-white px-6 py-3 rounded-3xl text-xl mt-2"
                            onClick={() => signOut()}
                        >
                            Log Out
                        </button>
                    </div>
                    <div className="w-full flex flex-col items-center mb-10">
                        <h2 className="text-2xl font-bold mb-4 text-[#452B1F]">
                            Your Reviews
                        </h2>
                        {loadingPosts && (
                            <p className="text-[#452B1F]">Loading your reviews…</p>
                        )}
                        {error && <p className="text-red-600">{error}</p>}
                        {!loadingPosts && !error && posts.length === 0 && (
                            <p className="text-[#452B1F]">
                                You haven&apos;t posted any reviews yet.
                            </p>
                        )}
                        <div className="flex flex-col items-center gap-4 w-full">
                            {posts.map((post) => (
                                <div key={post.id} className="w-full max-w-xl">
                                    <CoffeePost post={post} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
