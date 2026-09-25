"use client";

import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";

export default function LogoutButton() {
    async function handleLogout() {
        await signOut(auth);

        await fetch("/api/auth/logout", {
            method: "POST",
        });

        window.location.href = "/admin/login";

    }
    return (
        <button onClick={handleLogout} className="mt-4 border px-4 py-2">Logout</button>
    );
}