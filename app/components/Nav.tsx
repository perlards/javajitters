"use client";

import Link from "next/link";

export default function Nav() {
    return(
        <nav>
            <ul>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/about"}>About</Link></li>
                <li><Link href={""}>Taste Test</Link></li>
                <li><Link href={"/search"}>Search</Link></li>
                <li><Link href={"/profile"}>Profile</Link></li>
                <li><Link href={"/login"}>Log In</Link></li>
            </ul>
        </nav>
    )
}