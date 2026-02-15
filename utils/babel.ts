import { SearchMethod } from "../types";

const DICTIONARY = [
    "el",
    "la",
    "de",
    "que",
    "y",
    "en",
    "un",
    "ser",
    "a",
    "ella",
    "él",
    "amor",
    "futuro",
    "tiempo",
    "vida",
    "corazón",
    "alma",
    "eterno",
    "luz",
    "sombra",
    "espejo",
    "laberinto",
    "libro",
    "página",
    "palabra",
    "universo",
    "infinito",
    "ciego",
    "azar",
    "destino",
    "camino",
    "buscar",
    "encontrar",
    "perder",
    "olvido",
    "memoria",
    "fuego",
    "agua",
    "aire",
    "tierra",
    "cielo",
    "mar",
    "noche",
    "día",
    "sueño",
    "realidad",
    "ficción",
    "historia",
    "nosotros",
    "juntos",
    "siempre",
    "nunca",
    "tal",
    "vez",
    "acaso",
    "quizás",
    "porque",
    "para",
    "con",
    "sin",
    "sobre",
    "bajo",
    "ante",
    "entre",
    "hacia",
    "hasta",
    "desde",
    "durante",
    "contra",
    "donde",
    "cuando",
    "quien",
    "como",
    "cual",
    "cuyo",
    "aquí",
    "allí",
    "ahora",
    "entonces",
    "luego",
    "tan",
    "más",
    "menos",
    "muy",
    "mucho",
    "poco",
    "todo",
    "nada",
    "algo",
    "alguien",
    "nadie",
    "alguno",
    "ninguno",
    "otro",
    "mismo",
    "propio",
    "ajeno",
    "grande",
    "pequeño",
    "bueno",
    "malo",
    "nuevo",
    "viejo",
    "joven",
    "mayor",
    "menor",
    "mejor",
    "peor",
    "alto",
    "largo",
    "corto",
    "ancho",
    "estrecho",
    "fuerte",
    "débil",
    "rico",
    "pobre",
    "feliz",
    "triste",
    "bello",
    "feo",
    "dulce",
    "amargo",
    "caliente",
    "frío",
    "claro",
    "oscuro",
    "susurro",
    "grito",
    "silencio",
    "eco",
    "voz",
    "canción",
    "poema",
    "verso",
    "letra",
    "escrito",
    "papel",
    "tinta",
    "pluma",
    "mano",
    "dedo",
    "ojo",
    "mirada",
    "boca",
    "beso",
    "abrazo",
    "piel",
    "cuerpo",
    "sangre",
    "hueso",
    "mente",
    "pensamiento",
    "idea",
    "razón",
    "locura",
    "verdad",
    "mentira",
    "secreto",
    "misterio",
    "enigma",
    "clave",
    "llave",
    "puerta",
    "ventana",
    "muro",
    "pared",
    "techo",
    "suelo",
    "paso",
    "huella",
    "rastro",
    "mapa",
    "brújula",
    "norte",
    "sur",
    "este",
    "oeste",
    "arriba",
    "abajo",
    "dentro",
    "fuera",
    "lejos",
    "cerca",
    "ayer",
    "mañana",
    "hoy",
    "eterno",
    "instante",
    "momento",
    "siglo",
    "año",
    "mes",
    "semana",
    "hora",
    "minuto",
    "segundo",
];

const CHARS = "abcdefghijklmnopqrstuvwxyz, .";

export interface BabelPageData {
    content: string;
    startIndex: number;
    endIndex: number;
}

export const generateBabelPage = (
    searchText: string,
    method: SearchMethod = "spanish_words",
): BabelPageData => {
    const PAGE_LENGTH = 3200;
    let content = "";

    while (content.length < PAGE_LENGTH + 100) {
        if (method === "spanish_words") {
            const word =
                DICTIONARY[Math.floor(Math.random() * DICTIONARY.length)];
            content += word + " ";
        } else {
            let chunk = "";
            for (let i = 0; i < 50; i++) {
                chunk += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
            }
            content += chunk;
        }
    }

    let baseContent = content.slice(0, PAGE_LENGTH);

    let cleanSearch = searchText;

    if (method === "spanish_words") {
        cleanSearch = searchText.replace(/\s+/g, " ").trim();
    } else {
        cleanSearch = searchText.toLowerCase().replace(/[^a-z, .]/g, "");
        if (cleanSearch.length === 0) cleanSearch = "vacio";
    }

    const maxIndex = Math.max(0, baseContent.length - cleanSearch.length);
    const insertIndex = Math.floor(Math.random() * maxIndex);

    const before = baseContent.slice(0, insertIndex);
    const after = baseContent.slice(insertIndex + cleanSearch.length);

    const fullPage = before + cleanSearch + after;

    return {
        content: fullPage,
        startIndex: insertIndex,
        endIndex: insertIndex + cleanSearch.length,
    };
};
