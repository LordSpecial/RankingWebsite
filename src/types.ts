export interface MediaItem {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    runtime?: number;
    genres: { id: number; name: string }[];
    director?: string;
    cast?: { name: string; character: string }[];
    tags?: string[];
}

export interface CrewMember {
    job: string;
    name: string;
}

export interface CastMember {
    name: string;
    character: string;
}

export interface Keyword {
    name: string;
}
