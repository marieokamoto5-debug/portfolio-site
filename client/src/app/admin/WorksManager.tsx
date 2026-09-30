"use client";

import { FormEvent, useState } from "react";

type Work = {
    id: number;
    title: string;
    description: string;
    url: string | null;
};

type WorksManagerProps = {
    initialWorks: Work[];
};

export default function WorksManager({
    initialWorks,
}: WorksManagerProps) {
    const [works, setWorks] = useState(initialWorks);

    // 新規追加用
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    // 編集用
    const [editingWorkId, setEditingWorkId] = useState<number | null>(null);
    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
    const [editingUrl, setEditingUrl] = useState("");

    async function handleAdd(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch("/api/admin/works", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                url: url || null,
            }),
        });

        if (!response.ok) {
            alert("実績の追加に失敗しました");
            return;
        }

        const newWork = await response.json();

        setWorks([...works, newWork]);
        setTitle("");
        setDescription("");
        setUrl("");
    }

    async function handleUpdate(workId: number) {
        const response = await fetch(
            `/api/admin/works/${workId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: editingTitle,
                    description: editingDescription,
                    url: editingUrl || null,
                }),
            }
        );

        if (!response.ok) {
            alert("実績の更新に失敗しました");
            return;
        }

        const updatedWork = await response.json();

        setWorks(
            works.map((work) =>
                work.id === updatedWork.id
                    ? updatedWork
                    : work
            )
        );

        setEditingWorkId(null);
        setEditingTitle("");
        setEditingDescription("");
        setEditingUrl("");
    }

    async function handleDelete(workId: number) {
        const response = await fetch(
            `/api/admin/works/${workId}`,
            {
                method: "DELETE",
            }
        );

        if (!response.ok) {
            alert("実績の削除に失敗しました");
            return;
        }

        setWorks(
            works.filter((work) => work.id !== workId)
        );
    }

    return (
        <div className="mt-4">
            <form onSubmit={handleAdd} className="space-y-2">
                <input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="タイトル"
                    className="w-full border p-2"
                />

                <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="説明"
                    className="w-full border p-2"
                />

                <input
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="URL（任意）"
                    className="w-full border p-2"
                />

                <button
                    type="submit"
                    className="border px-4 py-2"
                >
                    追加
                </button>
            </form>

            <ul className="mt-4 space-y-4">
                {works.map((work) => (
                    <li
                        key={work.id}
                        className="border p-4"
                    >
                        {editingWorkId === work.id ? (
                            <>
                                <input
                                    value={editingTitle}
                                    onChange={(event) =>
                                        setEditingTitle(event.target.value)
                                    }
                                    placeholder="タイトル"
                                    className="w-full border p-2"
                                />

                                <textarea
                                    value={editingDescription}
                                    onChange={(event) =>
                                        setEditingDescription(event.target.value)
                                    }
                                    placeholder="説明"
                                    className="w-full border p-2"
                                />

                                <input
                                    value={editingUrl}
                                    onChange={(event) =>
                                        setEditingUrl(event.target.value)
                                    }
                                    placeholder="URL（任意）"
                                    className="w-full border p-2"
                                />

                                <div className="mt-2">
                                    <button
                                        type="button"
                                        onClick={() => handleUpdate(work.id)}
                                        className="border px-3 py-2"
                                    >
                                        保存
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setEditingWorkId(null)}
                                        className="border px-3 py-2"
                                    >
                                        キャンセル
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>{work.title}</p>
                                <p>{work.description}</p>

                                {work.url && (
                                    <a
                                        href={work.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline"
                                    >
                                        {work.url}
                                    </a>
                                )}

                                <div className="mt-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingWorkId(work.id);
                                            setEditingTitle(work.title);
                                            setEditingDescription(work.description);
                                            setEditingUrl(work.url ?? "");
                                        }}
                                        className="border px-3 py-2"
                                    >
                                        編集
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(work.id)}
                                        className="border px-3 py-2"
                                    >
                                        削除
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
