"use client";

import {useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";

export default function  LoginForm() {
    const [loading, setLoading] = useState(false);
    const {data, status } = useSession();
    const loggedIn = status === "authenticated";
    const divStyle = "flex flex-col place-content-center justify-self-center text-navajo-white items-center bg-[#452B1F] m-5 w-4/5 h-130";
    const buttonStyle= "bg-toffee-brown text-navajo-white max-w-1/5 p-4 m-3 rounded-3xl text-4xl";

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
        <div className={"h-full"}>
            <h1 className={"text-3xl font-bold mt-10 mb-4 text-[#452B1F] text-center"}>Login Page</h1>

            <div className={divStyle}>
                <h3 className={"p-9 mr-30 ml-30 align-middle text-center text-5xl"}>{loggedIn ? "Welcome! Hope you enjoy our app! Feel free to log out whenever you want!" : "Log into JavaJitters with your BU Account! Just press the button below" } </h3>

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
        </div>
    )
}