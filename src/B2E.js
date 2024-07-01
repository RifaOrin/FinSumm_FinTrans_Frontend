import React, { useState } from "react";
import axios from "axios";

const B2E = () => {
    const [text, setText] = useState("");
    const [translation, setTranslate] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleTranslation = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/translate/b2e/",
                { text }
            );
            console.log(response.data);
            setTranslate(response.data.translation);
        } catch (err) {
            setError("An error occurred while translating the text.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Bangla to English Translation</h1>
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Enter your text here"
                rows="10"
                cols="50"
            />
            <br />
            <button onClick={handleTranslation}>Translate</button>
            {loading && <div>Loading...</div>}
            {error && <div style={{ color: "red" }}>{error}</div>}
            {translation && (
                <div>
                    <h2>Translation</h2>
                    <p>{translation}</p>
                </div>
            )}
        </div>
    );
};

export default B2E;
