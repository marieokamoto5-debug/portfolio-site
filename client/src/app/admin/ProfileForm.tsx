"use client";

import { FormEvent, useState } from "react";

type ProfileFormProps = {
    name: string;
    bio: string;
};

export default function ProfileForm({
    name: initialName,
    bio: initialBio,
}: ProfileFormProps) {
    const [name, setName] = useState(initialName);
    const [bio, setBio] = useState(initialBio);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch("/api/admin/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                bio,
            }),
        });

        if (!response.ok) {
            alert("プロフィールの更新に失敗しました");
            return;
        }
        alert("プロフィールを更新しました");
    }
    return (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
                <label htmlFor="name">名前</label>
                <input
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full border p-2"
                />
            </div>
            <div>
                <label htmlFor="bio">自己紹介</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    className="w-full border p-2"
                />
                <button type="submit" className="border px-4 py-2">保存</button>
            </div>
        </form>
    );
}