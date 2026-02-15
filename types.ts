export interface BookLocation {
    hex: string;
    wall: number; // 1-4
    shelf: number; // 1-5
    volume: number; // 1-32
    page: number; // 1-410
}

export type SearchMethod = "spanish_words" | "random_characters";

export enum AppState {
    IDLE = "IDLE",
    WRITING = "WRITING",
    SEARCHING = "SEARCHING",
    FOUND = "FOUND",
    ERROR = "ERROR",
}
