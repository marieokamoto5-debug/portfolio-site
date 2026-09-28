import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { profile } from "console";
import ProfileForm from "./ProfileForm";

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

    const profileResponse = await fetch(
        `${process.env.FASTAPI_URL}/profile`,
        {
            cache: "no-store",
        }
    );
    if (!profileResponse.ok) {
        throw new Error("プロフィールの取得に失敗しました")
    }

    const profile = await profileResponse.json();



    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">管理画面</h1>
            <p>管理者としてログインしています。</p>
            <LogoutButton />
            <section className="mt-8">
                <h2 className="text-xl font-bold">プロフィール</h2>
                <ProfileForm
                    name={profile.name}
                    bio={profile.bio}
                />
            </section>
        </main>
    );
}