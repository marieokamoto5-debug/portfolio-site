import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

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