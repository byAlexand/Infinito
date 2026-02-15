import { BookLocation, SearchMethod } from "../types";

const ALPHABET = "abcdefghijklmnopqrstuvwxyz, .";
const PAGE_LINES = 40;
const CHARS_PER_LINE = 80;
const PAGE_LENGTH = PAGE_LINES * CHARS_PER_LINE;

class SplitMix32 {
    private state: number;

    constructor(seed: number) {
        this.state = seed | 0;
    }

    public next(): number {
        this.state = (this.state + 0x9e3779b9) | 0;
        let z = this.state;
        z = (z ^ (z >>> 16)) * 0x85ebca6b;
        z = (z ^ (z >>> 13)) * 0xc2b2ae35;
        z = z ^ (z >>> 16);
        return (z >>> 0) / 4294967296;
    }

    public nextInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
}

const cyrb53 = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 =
        Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
        Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 =
        Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
        Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export interface BabelPageData {
    content: string;
    location: BookLocation;
    startIndex: number;
    endIndex: number;
}

const normalizeToBabel = (text: string): string => {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\n/g, " ")
        .replace(/[^a-z, .]/g, " ");
};

export const generateBabelPage = (
    userText: string,
    method: SearchMethod = "spanish_words",
): BabelPageData => {
    const seedString =
        userText +
        (method === "random_characters"
            ? "_chaos_entropy"
            : "_standard_entropy");
    const seed = cyrb53(seedString);
    const rng = new SplitMix32(seed);

    let hexName = "";
    const hexChars = "0123456789abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 32; i++) {
        hexName += hexChars[rng.nextInt(0, 35)];
    }

    const location: BookLocation = {
        hex: hexName,
        wall: rng.nextInt(1, 4),
        shelf: rng.nextInt(1, 5),
        volume: rng.nextInt(1, 32),
        page: rng.nextInt(1, 410),
    };

    const cleanSearch = normalizeToBabel(userText).replace(/\s+/g, " ").trim();

    const pageContentArray = new Array(PAGE_LENGTH);
    const alphabetLen = ALPHABET.length;

    const validLength = Math.min(cleanSearch.length, PAGE_LENGTH);
    const maxIndex = Math.max(0, PAGE_LENGTH - validLength);
    const insertIndex = rng.nextInt(0, maxIndex);

    for (let i = 0; i < PAGE_LENGTH; i++) {
        const charIndex = rng.nextInt(0, alphabetLen - 1);

        if (i < insertIndex || i >= insertIndex + validLength) {
            pageContentArray[i] = ALPHABET[charIndex];
        } else {
            pageContentArray[i] = cleanSearch[i - insertIndex];
        }
    }

    const finalContent = pageContentArray.join("");

    return {
        content: finalContent,
        location,
        startIndex: insertIndex,
        endIndex: insertIndex + validLength,
    };
};
