"use client";

import {useState} from "react";
import {signIn} from "@/auth";

export default function  LoginForm() {
    const [loading, setLoading] = useState(false);

    const sendToLogin = async () => {
        try {
            setLoading(true);
            await signIn("google");
        }catch(err) {
            setLoading(false);
            console.log(err);
        }

    }

    return (
        <div>
            <h1>Login Page</h1>
            <h3>Log in to JavaJitters with your BU Account! Just press the button below</h3>

            <button
                onClick={sendToLogin}
                disabled={loading}
            >
                Log In
            </button>


        </div>
    )
}