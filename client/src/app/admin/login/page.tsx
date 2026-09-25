"use client";

import { FormEvent, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const idToken = await userCredential.user.getIdToken(true);

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_FASTAPI_URL}/auth/admin-check`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            }
        );

        const data = await response.json();

        if (!response.ok || !data.admin) {
            alert("管理者権限がありません。");
            return;
        }
        await fetch("/api/auth/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
        });

        window.location.href = "/admin";

    }
    return (
        <main className="mx-auto max-w-md p-8">
            <h1 className="mb-6 text-2xl font-bold">Admin Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full border p-2"
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full border p-2"
                    />
                </div>

                <button type="submit" className="border px-4 py-2">
                    Login
                </button>
            </form>
        </main>
    );
}