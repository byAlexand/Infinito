import React, { useRef } from "react";
import { Search, ExternalLink } from "lucide-react";
import { SearchMethod } from "../types";

interface LibrarySearchFormProps {
    searchText: string;
    searchMethod?: SearchMethod;
}

const LibrarySearchForm: React.FC<LibrarySearchFormProps> = ({
    searchText,
    searchMethod = "spanish_words",
}) => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const methodCode = searchMethod === "spanish_words" ? "w" : "x";

    return (
        <div className="mt-12 flex flex-col items-center">
            <form
                ref={formRef}
                action="https://libraryofbabel.info/search.cgi"
                method="POST"
                target="_blank"
                className="inline-block"
            >
                <input type="hidden" name="find" value={searchText} />
                <input type="hidden" name="method" value={methodCode} />

                <button
                    onClick={handleSubmit}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full transition-all duration-300 border border-zinc-800 hover:border-zinc-600 shadow-lg"
                >
                    <ExternalLink
                        size={14}
                        className="text-zinc-500 group-hover:text-zinc-300 transition-colors"
                    />
                    <span className="uppercase tracking-[0.15em] text-[10px] font-medium">
                        Verificar en la Biblioteca Real
                    </span>
                </button>
            </form>

            <p className="mt-5 text-[10px] text-zinc-500 max-w-xs text-center leading-relaxed font-light tracking-wide opacity-80">
                Se abrirá el portal oficial para confirmar la existencia de este
                texto exacto.
            </p>
        </div>
    );
};

export default LibrarySearchForm;
