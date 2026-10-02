"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");


    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const response = await fetch("/api/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                subject,
                message,
            }),
        });

        if (!response.ok) {
            setSubmitMessage("問い合わせの送信に失敗しました");
            return;
        }

        setSubmitMessage("お問い合わせを受け付けました");

        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="お名前"
                className="w-full border p-2"
            />

            <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="メールアドレス"
                className="w-full border p-2"
            />

            <input
                required
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="件名"
                className="w-full border p-2"
            />

            <textarea
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="お問い合わせ内容"
                className="w-full border p-2"
            />

            <button type="submit" className="border px-4 py-2">
                送信
            </button>
            {submitMessage && (
                <p>{submitMessage}</p>
            )}
        </form>
    );
}