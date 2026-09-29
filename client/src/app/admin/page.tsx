import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";

import LogoutButton from "./LogoutButton";
import ProfileForm from "./ProfileForm";
import SkillsManager from "./SkillsManager";

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
        throw new Error("プロフィールの取得に失敗しました");
    }

    const profile = await profileResponse.json();

    const skillsResponse = await fetch(
        `${process.env.FASTAPI_URL}/skills`,
        {
            cache: "no-store",
        }
    );

    if (!skillsResponse.ok) {
        throw new Error("スキルの取得に失敗しました");
    }

    const skills = await skillsResponse.json();

    const contactsResponse = await fetch(
        `${process.env.FASTAPI_URL}/admin/contacts`,
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
            cache: "no-store",
        }
    );

    if (!contactsResponse.ok) {
        throw new Error("問い合わせ一覧の取得に失敗しました");
    }

    const contacts = await contactsResponse.json();

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

            <section className="mt-8">
                <h2 className="text-xl font-bold">スキル</h2>

                <SkillsManager initialSkills={skills} />
            </section>

            <section className="mt-8">
                <h2 className="text-xl font-bold">お問い合わせ</h2>

                <ul className="mt-4 space-y-4">
                    {contacts.map((contact: {
                        id: number;
                        name: string;
                        subject: string;
                        created_at: string;
                    }) => (
                        <li key={contact.id} className="border p-4">
                            <p>ID: {contact.id}</p>
                            <p>名前: {contact.name}</p>
                            <p>件名: {contact.subject}</p>
                            <p>送信日時: {contact.created_at}</p>

                            <Link
                                href={`/admin/contacts/${contact.id}`}
                                className="underline"
                            >
                                詳細を見る
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}