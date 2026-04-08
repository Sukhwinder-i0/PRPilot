"use client";

import { useState, useEffect } from "react";

export function ApiKeyForm() {
    const [hasKey, setHasKey] = useState(false);
    const [maskedKey, setMaskedKey] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

    useEffect(() => {
        fetchKeyStatus();
    }, []);

    const fetchKeyStatus = async () => {
        try {
            const res = await fetch("/api/user/gemini-key");
            if (res.ok) {
                const data = await res.json();
                setHasKey(data.hasKey);
                if (data.maskedKey) setMaskedKey(data.maskedKey);
            }
        } catch (error) {
            console.error("Failed to fetch key status", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!inputValue.trim()) {
            setMessage({ text: "Please enter a valid API key.", type: "error" });
            return;
        }

        setSaving(true);
        try {
            const res = await fetch("/api/user/gemini-key", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ key: inputValue }),
            });

            if (res.ok) {
                setMessage({ text: "API Key saved successfully!", type: "success" });
                setInputValue("");
                await fetchKeyStatus();
            } else {
                setMessage({ text: "Failed to save API key.", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "An error occurred.", type: "error" });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to remove your custom Gemini API key? PRPilot will fall back to its internal key.")) return;

        setSaving(true);
        try {
            const res = await fetch("/api/user/gemini-key", { method: "DELETE" });
            if (res.ok) {
                setMessage({ text: "API Key removed.", type: "success" });
                setHasKey(false);
                setMaskedKey("");
            } else {
                setMessage({ text: "Failed to remove API key.", type: "error" });
            }
        } catch (error) {
            setMessage({ text: "An error occurred.", type: "error" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="animate-pulse h-24 bg-gray-900 rounded-xl my-6"></div>;
    }

    return (
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 my-6">
            <h3 className="text-lg font-semibold text-white mb-2">Custom Gemini API Key</h3>
            <p className="text-gray-400 text-sm mb-6">
                Provide your own Google Gemini API key to run PR reviews using your personal quota and billing.
                If left blank, PRPilot will attempt to use its default key.
            </p>

            {hasKey ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-950 rounded-lg border border-gray-800">
                    <div className="flex-1">
                        <span className="text-sm font-medium text-gray-300">Active Key:</span>
                        <code className="ml-3 text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded text-sm">
                            {maskedKey}
                        </code>
                    </div>
                    <button
                        onClick={handleDelete}
                        disabled={saving}
                        className="text-sm text-red-400 hover:text-red-300 font-medium disabled:opacity-50 transition-colors"
                    >
                        {saving ? "Removing..." : "Remove Key"}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="password"
                        placeholder="AIzaSy..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="flex-1 bg-gray-950 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={saving || !inputValue.trim()}
                        className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-500 text-white font-medium py-2.5 px-6 rounded-md text-sm transition-colors"
                    >
                        {saving ? "Saving..." : "Save Key"}
                    </button>
                </form>
            )}

            {message && (
                <p className={`mt-4 text-sm font-medium ${message.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
                    {message.text}
                </p>
            )}
        </div>
    );
}
