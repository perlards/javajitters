"use client";

import {useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";

export default function  LoginForm() {
    const [loading, setLoading] = useState(false);
    const {data, status } = useSession();
    const loggedIn = status === "authenticated";

    const sendToLogin = async () => {
        try {
            setLoading(true);
            await signIn("google");
        }catch(err) {
            setLoading(false);
            console.log(err);
        }

    }

    const sendToLogOut = async () => {
        try {
            setLoading(true);
            await signOut();
        }catch(err) {
            setLoading(false);
            console.log(err);
        }

    }

    return (
        <div>
            <h1>Login Page</h1>
            <h3>Log {loggedIn ? "out of" : "into" } JavaJitters with your BU Account! Just press the button below</h3>

            {loggedIn ? (
                    <button onClick={sendToLogOut}>
                        {loading ? "Logging out..." : "Log Out"}
                    </button>
                )
                :(
                    <button onClick={sendToLogin}>
                        {loading ? "Redirecting..." : "Log In"}
                    </button>
                )
            }
        </div>
    )
}