import React, { useState } from "react";
import axios from "axios";
import "./TextSummarizer.css";

const TextSummarizer = () => {
    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [translation, setTranslate] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingTranslate, setLoadingTranslate] = useState(false);
    const [error, setError] = useState("");
    const [language, setLanguage] = useState("english");

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setText("");
        setSummary("");
        setTranslate("");
        setError("");
    };

    const handleSummarize = async () => {
        setLoading(true);
        setError("");
        const endpoint = language === "english" ? "http://127.0.0.1:8000/summarize/english/" : "http://127.0.0.1:8000/summarize/bangla/";
        try {
            const response = await axios.post(endpoint, { text }, { headers: { 'Content-Type': 'application/json' } });
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
        const endpoint = language === "english" ? "http://127.0.0.1:8000/translate/e2b/" : "http://127.0.0.1:8000/translate/b2e/";
        try {
            const response = await axios.post(endpoint, { text: summary }, { headers: { 'Content-Type': 'application/json' } });
            setTranslate(response.data.translation);
        } catch (err) {
            setError("An error occurred while translating the text.");
        } finally {
            setLoadingTranslate(false);
        }
    };

    return (
        <div className="container">
            <h1>Text Summarizer and Translator</h1>
            <div className="button-group">
                <button className={`lang-button ${language === "english" ? "active" : ""}`} onClick={() => handleLanguageChange("english")}>English</button>
                <button className={`lang-button ${language === "bangla" ? "active" : ""}`} onClick={() => handleLanguageChange("bangla")}>Bengali</button>
            </div>
            <div className="input-section">
                <textarea
                    className="text-input"
                    value={text}
                    onChange={handleTextChange}
                    placeholder={`Enter your text in ${language}`}
                    rows="10"
                    cols="50"
                />
                <button className="action-button" onClick={handleSummarize}>Summarize</button>
                {loading && <div className="loading">Loading...</div>}
                {error && <div className="error">{error}</div>}
            </div>
            {summary && (
                <div className="result-section">
                    <div className="summary-section">
                        <h2>Summary</h2>
                        <textarea
                            className="summary-output"
                            value={summary}
                            readOnly
                            rows="10"
                            cols="50"
                        />
                        <button className="action-button" onClick={handleTranslation}>
                            {language === "english" ? "Translate to Bengali" : "Translate to English"}
                        </button>
                    </div>
                    {loadingTranslate && <div className="loading">Loading...</div>}
                    {translation && (
                        <div className="translation-section">
                            <h2>Translated Text</h2>
                            <textarea
                                className="translate-output"
                                value={translation}
                                readOnly
                                rows="10"
                                cols="50"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TextSummarizer;
