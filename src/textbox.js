import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
const Textbox = () => {
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

    const calculateRows = () => {
        const lineBreaks = (text.match(/\n/g) || []).length; // Count '\n' characters
        const totalLines = text.split('\n').length + lineBreaks; // Total lines including wrapped lines

        return Math.min(Math.max(totalLines, 2), 5); // Minimum 3 rows, maximum 20 rows
    };



    return(
            
        <div className="flex justify-center mt-2">
    <div className="w-full relative">
        <textarea
            className="w-full h-auto p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#a116a1] font-medium"
            value={text}
            onChange={handleTextChange}
            placeholder={`Enter your text in ${language} to summarize`}
            rows={calculateRows()}
            cols="50"
        />
        <div className="absolute bottom-4 right-0 flex items-center mr-8">
            <button
                className={`lang-button font-medium ${language === "english" ? "bg-[#a116a1] text-white" : "bg-gray-200 text-gray-700"} px-4 py-2 rounded-lg mr-2`}
                onClick={() => handleLanguageChange("english")}
            >
                En
            </button>
            <button
                className={`lang-button font-medium ${language === "bangla" ? "bg-[#a116a1] text-white" : "bg-gray-200 text-gray-700"} px-4 py-2 rounded-lg`}
                onClick={() => handleLanguageChange("bangla")}
            >
                Bn
            </button>

            <IoSend className="action-button text-2xl ml-5 text-[#a116a1] hover:text-[#e75be7]" onClick={handleSummarize} />
        </div>
    </div>
</div>


                
            
        
    );

};

export default Textbox;