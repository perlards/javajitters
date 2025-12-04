"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Nav() {
    const {data, status} = useSession();
    let loggedIn = false;


    if (status === "loading") {
        loggedIn = false;
    } else if (status === "unauthenticated") {
        loggedIn = false;
    } else if (status === "authenticated") {
        loggedIn = true;
    }


    return(
        <nav>
            <ul>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/about"}>About</Link></li>
                <li><Link href={"/input"}>Taste Test</Link></li>
                <li><Link href={"/search"}>Search</Link></li>
                <li><Link href={"/profile"}>Profile</Link></li>
                <li><Link href={"/login"} >{loggedIn ? "Log Out" : "Log In"}</Link></li>
            </ul>
        </nav>
    )
}