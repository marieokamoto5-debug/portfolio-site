import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function AdminPage() {
    const cookieStore = await cookies();
    const idToken = cookieStore.get("firebase_id_token")?.value;

    if (!idToken) {
        notFound();
    }

    const response = await fetch(
        `${process.env.FASTAPI_URL}/auth/check`,
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        notFound();
    }

    const user = await response.json();

    if (!user.admin) {
        notFound();
    }

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">管理画面</h1>
            <p>管理者としてログインしています。</p>
            <LogoutButton />
        </main>
    );
}