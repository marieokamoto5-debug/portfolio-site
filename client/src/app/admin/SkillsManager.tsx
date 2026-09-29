"use client";

import { FormEvent, useState } from "react";

type Skill = {
    id: number;
    name: string;
};

type SkillsManagerProps = {
    initialSkills: Skill[];
};

export default function SKillsManager({
    initialSkills,
}: SkillsManagerProps) {
    const [skills, setSkills] = useState(initialSkills);
    const [name, setName] = useState("");
    const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState("");


    async function handleAdd(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const response = await fetch("/api/admin/skills", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        if (!response.ok) {
            alert("スキルの追加に失敗しました");
            return;
        }
        const newSkill = await response.json();
        setSkills([...skills, newSkill]);
        setName("");
    }

    async function handleUpdate(skillId: number) {
        const response = await fetch(`/api/admin/skills/${skillId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: editingName,
            }),
        });

        if (!response.ok) {
            alert("スキルの更新に失敗しました");
            return;
        }
        const updatedSkill = await response.json();

        setSkills(
            skills.map((skill) =>
                skill.id === updatedSkill.id
                    ? updatedSkill
                    : skill
            )
        );

        setEditingSkillId(null);
        setEditingName("");
    }

    async function handleDelete(skillId: number) {
        const response = await fetch(`/api/admin/skills/${skillId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            alert("スキルの削除に失敗しました");
            return;
        }

        setSkills(
            skills.filter((skill) => skill.id !== skillId)
        );
    }





    return (
        <div className="mt-4">
            <form onSubmit={handleAdd} className="flex gap-2">
                <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="border p-2"
                    placeholder="スキル名"
                />

                <button type="submit" className="border px-4 py-2">
                    追加
                </button>
            </form>
            <ul className="mt-4 space-y-2">
                {skills.map((skill) => (
                    <li key={skill.id} className="flex gap-2">
                        <input
                            value={
                                editingSkillId === skill.id
                                    ? editingName
                                    : skill.name
                            }
                            onChange={(event) => setEditingName(event.target.value)}
                            readOnly={editingSkillId !== skill.id}
                            className="border p-2"
                        />

                        {editingSkillId === skill.id ? (
                            <button
                                type="button"
                                onClick={() => handleUpdate(skill.id)}
                                className="border px-3 py-2"
                            >
                                保存
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingSkillId(skill.id);
                                    setEditingName(skill.name);
                                }}
                                className="border px-3 py-2"
                            >
                                編集
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => handleDelete(skill.id)}
                            className="border px-3 py-2"
                        >
                            削除
                        </button>
                    </li>
                ))}
            </ul>
        </div>


    );


}