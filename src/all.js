import React, { useState } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import SideNav from "./SideNav";
import Textbox from "./textbox";

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
            // Clear the text area
            setText('');
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
    const calculateRows = () => {
        const lineBreaks = (text.match(/\n/g) || []).length; // Count '\n' characters
        const totalLines = text.split('\n').length + lineBreaks; // Total lines including wrapped lines

        return Math.min(Math.max(totalLines, 2), 5); // Minimum 3 rows, maximum 20 rows
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          handleSummarize();
        }
    };
    const handleNewText = () => {
        setText("");
        setSummary("");
        setTranslate("");
        setError("");
    };
    const LoadingSpinner = () => (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
    );
    
    const ErrorAlert = ({ message }) => (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline">{message}</span>
            </div>
        </div>
    );
    
    return (
        <div className="flex h-screen overflow-hidden">
            <SideNav onNewText={handleNewText} />
            <div className="flex-1 bg-white z-10 overflow-auto">
                <div className="w-full h-16 pt-4 pl-7 bg-white border sticky top-0"><h1 className="text-2xl font-semibold text-gradient1">FinBriefs</h1></div>
                <h1 className="text-4xl mt-10 mb-10 font-semibold text-gradient2 flex justify-center items-center">
                    Text <span className="text-gradient3 ml-2 mr-2">Summarizer</span> and <span className="text-gradient1 ml-2">Translator</span>
                </h1>

                <div className="flex flex-col h-3/4">
                    <div className="flex-1 flex items-center justify-center mb-3">
                        {summary && (
                            <div className="result-section p-4 bg-dark-white rounded-lg shadow-lg">
                                <div className="summary-section mb-4">
                                    <h2 className="text-md font-semibold mb-4 mt-2 ">Here is your summary</h2>
                                    <textarea
                                        className="text-sm w-full p-2 border rounded-lg resize-none"
                                        value={summary}
                                        readOnly
                                        rows="5"
                                        cols="50"
                                    />
                                    <button
                                        className="action-button mt-4 bg-[#c417c4] hover:bg-[#a116a1] font-medium text-sm text-white px-4 py-2 rounded-lg"
                                        onClick={handleTranslation}
                                    >
                                        {language === "english" ? "Translate to Bengali" : "Translate to English"}
                                    </button>
                                </div>
                                {loadingTranslate && <LoadingSpinner />}
                                {translation && (
                                    <div className="translation-section mt-4">
                                        <h2 className="text-md font-semibold mb-2">Translated Summary</h2>
                                        <textarea
                                            className="translate-output w-full p-2 border rounded-lg resize-none text-sm font-medium"
                                            value={translation}
                                            readOnly
                                            rows="5"
                                            cols="50"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="w-full pb-3 bg-white shadow-lg flex items-end justify-center sticky bottom-0">
                    <div className="flex justify-center mt-2">
                        <div className="w-full relative">
                        <textarea
                                    className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#a116a1] font-medium"
                                    value={text}
                                    onChange={handleTextChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder={`Enter your text in ${language} to summarize`}
                                    rows={calculateRows()}
                                    cols="50"
                                    disabled={!!summary || !!translation}
                                />
                                <div className="absolute bottom-4 right-0 flex items-center mr-8">
                                    <button
                                        className={`lang-button font-medium ${language === "english" ? "bg-[#a116a1] text-white" : "bg-gray-200 text-gray-700"} px-4 py-2 rounded-lg mr-2`}
                                        onClick={() => handleLanguageChange("english")}
                                        disabled={!!summary || !!translation}
                                    >
                                        En
                                    </button>
                                    <button
                                        className={`lang-button font-medium ${language === "bangla" ? "bg-[#a116a1] text-white" : "bg-gray-200 text-gray-700"} px-4 py-2 rounded-lg`}
                                        onClick={() => handleLanguageChange("bangla")}
                                        disabled={!!summary || !!translation}
                                    >
                                        Bn
                                    </button>
                                    <button
                                        className="action-button text-2xl ml-5 text-[#e45be4] hover:text-[#a116a1]"
                                        onClick={handleSummarize}
                                        disabled={!!summary || !!translation}
                                    >
                                        <IoSend />
                                    </button>
                            </div>
                        </div>
                    </div>
                        {loading && <LoadingSpinner />}
                        {error && <ErrorAlert message={error} />}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TextSummarizer;
