import React, { useEffect, useState, useMemo } from "react";
import { Quote, MapPin, Book, Columns, Layers, FileText } from "lucide-react";
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

    const { content, startIndex, endIndex, location } = pageData;
    const beforeText = content.substring(0, startIndex);
    const foundText = content.substring(startIndex, endIndex);
    const afterText = content.substring(endIndex);

    return (
        <div
            className={`w-full max-w-5xl mx-auto transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
            <div className="mb-12 text-center animate-in fade-in zoom-in duration-700">
                <div className="inline-block p-4 mb-6 rounded-full bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                    <Quote size={20} className="text-zinc-400" />
                </div>
                <p className="serif-font text-2xl md:text-3xl text-zinc-200 italic leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
                    "{librarianResponse}"
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-widest text-zinc-500">
                    Ubicación Exacta en el Universo
                </p>
            </div>

            <div className="bg-[#101012] shadow-[0_20px_70px_-20px_rgba(0,0,0,0.8)] border border-zinc-800 relative rounded-[1rem] mx-auto overflow-hidden ring-1 ring-white/5 group">
                <div className="bg-[#0c0c0e] border-b border-zinc-800/80 p-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3 text-zinc-400 w-full md:w-auto overflow-hidden">
                        <MapPin size={14} className="flex-shrink-0" />
                        <div className="flex flex-col min-w-0">
                            <span className="text-[9px] uppercase tracking-widest text-zinc-600">
                                Identificador Hexagonal
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.1em] font-mono truncate font-medium text-zinc-300">
                                {location.hex.substring(0, 24)}...
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-mono bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800/50">
                        <div
                            className="flex items-center gap-2"
                            title="Muro (Wall)"
                        >
                            <Columns size={12} /> <span>W{location.wall}</span>
                        </div>
                        <div
                            className="flex items-center gap-2"
                            title="Estante (Shelf)"
                        >
                            <Layers size={12} /> <span>S{location.shelf}</span>
                        </div>
                        <div
                            className="flex items-center gap-2"
                            title="Volúmen (Volume)"
                        >
                            <Book size={12} /> <span>V{location.volume}</span>
                        </div>
                        <div
                            className="flex items-center gap-2 text-zinc-200"
                            title="Página"
                        >
                            <FileText size={12} /> <span>P{location.page}</span>
                        </div>
                    </div>
                </div>

                <div className="relative bg-[#121214] custom-scrollbar overflow-x-auto">
                    <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-[#121214] to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-[#121214] to-transparent z-10 pointer-events-none"></div>

                    <div className="p-8 md:p-12 min-w-max">
                        <div
                            className="font-mono text-xs md:text-sm leading-[1.6] tracking-normal select-text text-zinc-700/60"
                            style={{
                                fontFamily: "'Courier Prime', monospace",
                                width: "80ch",
                                wordBreak: "break-all",
                                whiteSpace: "pre-wrap",
                                textAlign: "justify",
                                textAlignLast: "justify",
                            }}
                        >
                            <span>{beforeText}</span>

                            <span className="relative inline-block mx-0">
                                <span className="absolute -inset-0.5 bg-zinc-200/10 rounded-sm border border-zinc-500/20"></span>
                                <span className="relative text-zinc-100 font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                                    {foundText}
                                </span>
                            </span>
                            <span>{afterText}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0c0c0e] border-t border-zinc-800 p-3 flex justify-between px-6 opacity-60 hover:opacity-100 transition-opacity">
                    <div className="text-[9px] text-zinc-600 font-mono tracking-[0.2em]">
                        L.O.B. ARCHIVE
                    </div>
                    <div className="text-[9px] text-zinc-600 font-mono tracking-[0.2em]">
                        40L x 80C
                    </div>
                </div>
            </div>

            <LibrarySearchForm
                searchText={foundText}
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
