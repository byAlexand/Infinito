import React, { useState, useEffect } from "react";
import { Feather, Send, Loader2 } from "lucide-react";
import { SearchMethod } from "../types";

interface WritingDeskProps {
    onCommit: (text: string) => void;
    isProcessing: boolean;
    searchMethod: SearchMethod;
    onMethodChange: (method: SearchMethod) => void;
}

const WritingDesk: React.FC<WritingDeskProps> = ({
    onCommit,
    isProcessing,
    searchMethod,
    onMethodChange,
}) => {
    const [text, setText] = useState("");
    const [opacity, setOpacity] = useState("opacity-0");

    // Easter egg
    const [heartClicks, setHeartClicks] = useState(0);
    const [showSeal, setShowSeal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setOpacity("opacity-100"), 200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showSeal) {
            const timer = setTimeout(() => setShowSeal(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showSeal]);

    const handleHeartClick = () => {
        const newCount = heartClicks + 1;
        setHeartClicks(newCount);
        if (newCount >= 8) {
            setShowSeal(true);
            setHeartClicks(0);
        }
    };

    const handleSubmit = () => {
        if (text.trim().length > 0) {
            onCommit(text);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            handleSubmit();
        }
    };

    return (
        <div
            className={`w-full max-w-2xl mx-auto transition-all duration-1000 ${opacity}`}
        >
            <div
                className={`fixed inset-0 flex flex-col items-center justify-center z-50 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${showSeal ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"}`}
            >
                <div className="relative mb-4 md:mb-8 group">
                    <div className="bg-zinc-100/95 backdrop-blur-xl text-zinc-900 px-8 py-6 md:px-12 md:py-8 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(255,255,255,0.25)] border border-white/60 max-w-[90vw] mx-4 relative z-10">
                        <p className="text-xl md:text-4xl font-serif font-medium text-center tracking-wide leading-tight">
                            Feliz 14 de febrero 🦭🩷🖤
                        </p>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-zinc-100/95 border-b border-r border-white/60 rotate-45 z-0 shadow-sm"></div>
                </div>

                <div className="text-[10rem] md:text-[20rem] drop-shadow-2xl filter animate-[pulse_4s_infinite] select-none leading-none opacity-90">
                    🦭
                </div>
            </div>

            <div className="backdrop-blur-md bg-zinc-900/40 p-8 md:p-14 shadow-[0_10px_50px_-10px_rgba(0,0,0,0.5)] rounded-[2.5rem] border border-zinc-800/60 relative overflow-hidden group-hover:border-zinc-700/60 transition-colors">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                <div className="absolute top-8 left-0 w-full flex justify-center z-10">
                    <div className="bg-zinc-950/50 p-1 rounded-full border border-zinc-800/50 flex items-center relative">
                        <button
                            onClick={() =>
                                !isProcessing && onMethodChange("spanish_words")
                            }
                            disabled={isProcessing}
                            className={`relative z-10 w-28 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-medium transition-colors duration-500 flex items-center justify-center ${searchMethod === "spanish_words" ? "text-zinc-100" : "text-zinc-600 hover:text-zinc-400"} ${isProcessing ? "cursor-not-allowed opacity-50" : ""}`}
                        >
                            <span>Palabras</span>
                        </button>
                        <button
                            onClick={() =>
                                !isProcessing &&
                                onMethodChange("random_characters")
                            }
                            disabled={isProcessing}
                            className={`relative z-10 w-28 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-medium transition-colors duration-500 flex items-center justify-center ${searchMethod === "random_characters" ? "text-zinc-100" : "text-zinc-600 hover:text-zinc-400"} ${isProcessing ? "cursor-not-allowed opacity-50" : ""}`}
                        >
                            <span>Caos</span>
                        </button>

                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-zinc-800 rounded-full shadow-sm transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] border border-white/5 ${searchMethod === "spanish_words" ? "left-1" : "left-[calc(50%)]"}`}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3 mb-10 mt-12 text-zinc-500">
                    <Feather size={14} className="stroke-[1]" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium">
                        {searchMethod === "spanish_words"
                            ? "Escribe nuestro destino"
                            : "Desde las entrañas de un algoritmo"}
                    </span>
                    <Feather size={14} className="stroke-[1] scale-x-[-1]" />
                </div>

                <div className="relative group">
                    <textarea
                        autoFocus
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isProcessing}
                        placeholder={
                            searchMethod === "spanish_words"
                                ? "En el futuro, nosotros..."
                                : "Hasta el desorden del universo..."
                        }
                        className="w-full min-h-[220px] resize-none border-none bg-transparent text-xl md:text-3xl text-zinc-100 font-normal leading-relaxed placeholder:text-zinc-700/50 focus:ring-0 text-center serif-font outline-none transition-colors"
                        style={{ fontFamily: '"Cormorant Garamond", serif' }}
                        maxLength={3200}
                    />

                    <div className="absolute bottom-0 right-0 text-xs text-zinc-600 font-light pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-0 font-mono">
                        {text.length} / 3200
                    </div>
                </div>

                <div className="mt-14 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        disabled={!text.trim() || isProcessing}
                        className={`
              flex items-center gap-3 px-10 py-4 
              border border-zinc-800 rounded-full
              transition-all duration-500
              ${
                  !text.trim() || isProcessing
                      ? "opacity-80 cursor-wait bg-zinc-800/20 border-zinc-700"
                      : "hover:border-zinc-500 hover:bg-zinc-800/40 hover:shadow-[0_0_25px_rgba(255,255,255,0.08)] cursor-pointer"
              }
              ${!text.trim() && !isProcessing ? "opacity-30 cursor-not-allowed bg-transparent" : ""}
            `}
                    >
                        <span
                            className={`uppercase tracking-[0.25em] text-[10px] font-semibold transition-colors ${isProcessing ? "text-zinc-300 animate-pulse" : "text-zinc-400 group-hover:text-white"}`}
                        >
                            {isProcessing
                                ? "Buscando Coordenadas..."
                                : "Descubrir en la Eternidad"}
                        </span>

                        {isProcessing ? (
                            <Loader2
                                size={12}
                                className="text-zinc-300 animate-spin"
                            />
                        ) : (
                            <Send
                                size={12}
                                className="text-zinc-400 group-hover:text-white transition-colors"
                            />
                        )}
                    </button>
                </div>
            </div>

            <div className="text-center mt-10 text-zinc-500 text-[10px] tracking-[0.2em] font-light opacity-60 select-none">
                TODO TEXTO POSIBLE YA EXISTE EN LA OSCURIDAD. <br />
                SOLO HACE FALTA ENCONTRARLO. <br />
                <br />
                De Alexander, con Amor{" "}
                <span
                    onClick={handleHeartClick}
                    className="cursor-pointer hover:text-red-400 hover:scale-125 inline-block transition-all duration-300 active:scale-90"
                    title="❤️"
                >
                    ❤️
                </span>{" "}
                para ti.
            </div>
        </div>
    );
};

export default WritingDesk;
