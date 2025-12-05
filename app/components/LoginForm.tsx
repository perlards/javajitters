"use client";

import {useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";

export default function  LoginForm() {
    const [loading, setLoading] = useState(false);
    const {data, status } = useSession();
    const loggedIn = status === "authenticated";
    const divStyle = "flex flex-col justify-self-center text-navajo-white items-center bg-amber-950 m-5 w-4/5 h-4/5";
    const buttonStyle= "bg-toffee-brown text-navajo-white max-w-1/5 p-3 m-3 rounded-3xl";

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
        <div className={divStyle}>
            <h1 className={"font-bold p-2"}>Login Page</h1>
            <h3 className={"p-2"}>Log {loggedIn ? "out of" : "into" } JavaJitters with your BU Account! Just press the button below</h3>

            {loggedIn ? (
                    <button className={buttonStyle} onClick={sendToLogOut}>
                        {loading ? "Logging out..." : "Log Out"}
                    </button>
                )
                :(
                    <button className={buttonStyle} onClick={sendToLogin}>
                        {loading ? "Redirecting..." : "Log In"}
                    </button>
                )
            }
        </div>
    )
}