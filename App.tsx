import React, { useState } from "react";
import { AppState, SearchMethod } from "./types";
import WritingDesk from "./components/WritingDesk";
import EchoResult from "./components/EchoResult";
import { Infinity } from "lucide-react";

const STATIC_LIBRARIAN_RESPONSE =
    "En algún libro de esta biblioteca infinita se encuentra alguna historia nuestra aquí descrita.";

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>(AppState.IDLE);
    const [userText, setUserText] = useState("");
    const [searchMethod, setSearchMethod] =
        useState<SearchMethod>("spanish_words");

    const handleCommit = (text: string) => {
        setAppState(AppState.SEARCHING);
        setUserText(text);

        setTimeout(() => {
            setAppState(AppState.FOUND);
        }, 2000);
    };

    const handleReset = () => {
        setAppState(AppState.IDLE);
        setUserText("");
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden bg-[#09090b]">
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-zinc-100/5 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-zinc-200/5 rounded-full blur-[180px]"></div>
                <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 w-[50%] h-[50%] bg-white/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center">
                <header
                    className={`text-center mb-16 transition-all duration-1000 ease-in-out ${appState === AppState.FOUND ? "scale-95 opacity-80" : "scale-100 opacity-100"}`}
                >
                    <div className="flex justify-center mb-8">
                        <Infinity
                            size={56}
                            className="text-zinc-100 stroke-[0.5] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 mb-6 serif-font tracking-tight drop-shadow-sm">
                        Paula, mi niña.
                    </h1>
                    <p className="text-zinc-400 font-light tracking-[0.2em] text-xs md:text-sm leading-relaxed max-w-md mx-auto">
                        Escribe nuestra historia de amor. Encuéntrala en la
                        eternidad.
                    </p>
                </header>

                <main className="w-full max-w-4xl relative min-h-[400px]">
                    {appState === AppState.IDLE ||
                    appState === AppState.SEARCHING ? (
                        <WritingDesk
                            onCommit={handleCommit}
                            isProcessing={appState === AppState.SEARCHING}
                            searchMethod={searchMethod}
                            onMethodChange={setSearchMethod}
                        />
                    ) : (
                        <EchoResult
                            userText={userText}
                            librarianResponse={STATIC_LIBRARIAN_RESPONSE}
                            searchMethod={searchMethod}
                            onReset={handleReset}
                        />
                    )}
                </main>
            </div>

            <footer className="fixed bottom-6 w-full text-center pointer-events-none z-10"></footer>
        </div>
    );
};

export default App;
