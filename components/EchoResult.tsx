import React, { useEffect, useState, useMemo } from "react";
import { Quote } from "lucide-react";
import LibrarySearchForm from "./LibrarySearchForm";
import { generateBabelPage, BabelPageData } from "../utils/babel";
import { SearchMethod } from "../types";

interface EchoResultProps {
    userText: string;
    librarianResponse: string;
    searchMethod: SearchMethod;
    onReset: () => void;
}

const EchoResult: React.FC<EchoResultProps> = ({
    userText,
    librarianResponse,
    searchMethod,
    onReset,
}) => {
    const [visible, setVisible] = useState(false);

    const pageData: BabelPageData = useMemo(() => {
        return generateBabelPage(userText, searchMethod);
    }, [userText, searchMethod]);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const { content, startIndex, endIndex } = pageData;
    const beforeText = content.substring(0, startIndex);
    const foundText = content.substring(startIndex, endIndex);
    const afterText = content.substring(endIndex);

    const getCategoryLabel = () => {
        return searchMethod === "spanish_words"
            ? "Palabras Aleatorias (Español)"
            : "Caracteres Aleatorios (Puro Caos)";
    };

    return (
        <div
            className={`w-full max-w-4xl mx-auto transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <div className="mb-14 text-center animate-in fade-in zoom-in duration-700">
                <div className="inline-block p-4 mb-6 rounded-full bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                    <Quote size={20} className="text-zinc-400" />
                </div>
                <p className="serif-font text-2xl md:text-4xl text-zinc-200 italic leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
                    "{librarianResponse}"
                </p>
                <div className="mt-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent mx-auto"></div>
            </div>

            <div className="bg-[#101012] md:p-14 p-6 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.8)] border border-zinc-800 relative overflow-hidden rounded-[2.5rem] mx-auto max-w-3xl ring-1 ring-white/5">
                <div className="flex justify-between items-end border-b border-zinc-800 pb-5 mb-8">
                    <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">
                        Hex:{" "}
                        {Math.random()
                            .toString(36)
                            .substring(2, 10)
                            .toUpperCase()}
                    </div>
                    <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">
                        Wall {Math.floor(Math.random() * 4) + 1} &mdash; Vol{" "}
                        {Math.floor(Math.random() * 32) + 1}
                    </div>
                </div>

                <div className="font-serif text-justify text-sm md:text-base leading-relaxed tracking-wide select-none break-words whitespace-pre-wrap transition-colors duration-1000">
                    <span className="text-zinc-600 font-light">
                        {beforeText}
                    </span>

                    <span className="text-white font-medium bg-white/5 px-1 rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] decoration-clone border-b border-white/20">
                        {foundText}
                    </span>

                    <span className="text-zinc-600 font-light">
                        {afterText}
                    </span>
                </div>

                <div className="mt-10 pt-5 border-t border-zinc-800 flex justify-between items-center opacity-70">
                    <div className="text-[10px] text-zinc-500 font-mono tracking-widest">
                        PAGE {Math.floor(Math.random() * 410)}
                    </div>
                    <div className="text-[10px] text-zinc-500 italic">
                        Categoría: {getCategoryLabel()}
                    </div>
                </div>
            </div>

            <LibrarySearchForm
                searchText={userText}
                searchMethod={searchMethod}
            />

            <div className="mt-14 text-center pb-12">
                <button
                    onClick={onReset}
                    className="group text-zinc-500 text-[10px] uppercase tracking-[0.25em] hover:text-zinc-300 transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                    <span>Escribir otro destino</span>
                </button>
            </div>
        </div>
    );
};

export default EchoResult;
