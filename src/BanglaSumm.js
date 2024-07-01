import React, { useState } from "react";
import axios from "axios";

const BanglaSumm = () => {
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [translation, setTranslate] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingTranslate, setLoadingTranslate] = useState(false);
    const [error, setError] = useState("");

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSummarize = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/summarize/bangla/",
                { text },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setSummary(response.data.summary);
        } catch (err) {
            setError("An error occurred while summarizing the text.");
        } finally {
            setLoading(false);
        }
    };

    const handleTranslation = async () => {
        setLoadingTranslate(true);
        setError("");
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/translate/b2e/",
                { text: summary },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setTranslate(response.data.translation);
        } catch (err) {
            setError("An error occurred while translating the text.");
        } finally {
            setLoadingTranslate(false);
        }
    };

    return (
        <div>
            <h1>Bangla Text Summarizer</h1>
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter your text here"
                rows="10"
                cols="50"
            />
            <br />
            <button onClick={handleSummarize}>Summarize</button>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {summary && (
                <div>
                    <h2>Summary</h2>
                    <p>{summary}</p>
                    <button onClick={handleTranslation}>Translate to english</button>
                    {loadingTranslate && <div>Loading...</div>}
                    {translation && (
                        <div>
                            <h2>Translation</h2>
                            <p>{translation}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default BanglaSumm;
