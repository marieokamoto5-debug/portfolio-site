"use client";

import { FormEvent, useState } from "react";

type ProfileImageFormProps = {
    imageId: number | null;
};

export default function ProfileImageForm({
    imageId,
}: ProfileImageFormProps) {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!file) {
            setMessage("画像を選択してください");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/admin/profile/image", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            setMessage("画像の更新に失敗しました");
            return;
        }

        setMessage("画像を更新しました");
        window.location.reload();
    }

    return (
        <section className="mt-6">
            <h2 className="text-xl font-semibold">
                プロフィール画像
            </h2>

            {imageId && (
                <img
                    src={`http://127.0.0.1:8000/images/${imageId}`}
                    alt="プロフィール画像"
                    width={200}
                    className="mt-4 rounded-lg"
                />
            )}

            <form
                onSubmit={handleSubmit}
                className="mt-4 space-y-4"
            >
                <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) =>
                        setFile(event.target.files?.[0] ?? null)
                    }
                    className="
                        file:mr-3
                        file:rounded
                        file:border
                        file:border-black
                        file:bg-white
                        file:px-3
                        file:py-2
                    "
                />

                <button
                    type="submit"
                    className="rounded bg-black px-4 py-2 text-white"
                >
                    画像を更新
                </button>
            </form>

            {message && (
                <p className="mt-2">
                    {message}
                </p>
            )}
        </section>
    );
}