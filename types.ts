export interface BookLocation {
    hex: string;
    wall: string;
    shelf: string;
    volume: string;
    page: string;
}

export type SearchMethod = "spanish_words" | "random_characters";

export enum AppState {
    IDLE = "IDLE",
    WRITING = "WRITING",
    SEARCHING = "SEARCHING",
    FOUND = "FOUND",
    ERROR = "ERROR",
}
