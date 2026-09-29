import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";

type Contact = {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
};

export default async function ContactDetailPage({
    params,
}: {
    params: Promise<{ contactId: string }>;
}) {
    const { contactId } = await params;

    const cookieStore = await cookies();
    const idToken = cookieStore.get("firebase_id_token")?.value;

    if (!idToken) {
        notFound();
    }

    const response = await fetch(
        `${process.env.FASTAPI_URL}/admin/contacts/${contactId}`,
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
            cache: "no-store",
        }
    );

    if (response.status === 404) {
        notFound();
    }

    if (!response.ok) {
        throw new Error("問い合わせ詳細の取得に失敗しました");
    }

    const contact: Contact = await response.json();

    return (
        <main className="p-8">
            <h1 className="text-2xl font-bold">問い合わせ詳細</h1>

            <div className="mt-6 space-y-3">
                <p>ID: {contact.id}</p>
                <p>名前: {contact.name}</p>
                <p>メール: {contact.email}</p>
                <p>件名: {contact.subject}</p>
                <p>送信日時: {contact.created_at}</p>

                <div>
                    <p className="font-bold">本文</p>
                    <p className="whitespace-pre-wrap">{contact.message}</p>
                </div>
            </div>

            <Link
                href="/admin"
                className="mt-6 inline-block underline"
            >
                一覧に戻る
            </Link>
        </main>
    );
}