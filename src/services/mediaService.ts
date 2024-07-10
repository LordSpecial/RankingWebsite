import { MediaItem, CrewMember, CastMember, Keyword } from '../types';

const apiKey = '4bc70abe225997a36d12ccea148b9f10';
const tmdbPageSize = 20;

const fetchMediaItems = async (mediaType: 'movie' | 'tv' | 'anime', page: number, itemsPerPage: number): Promise<MediaItem[]> => {
    const startIndex = (page - 1) * itemsPerPage;
    const startPage = Math.floor(startIndex / tmdbPageSize) + 1;
    const endIndex = startIndex + itemsPerPage;
    const endPage = Math.ceil(endIndex / tmdbPageSize);

    const promises = [];
    for (let i = startPage; i <= endPage; i++) {
        let apiUrl = `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${apiKey}&language=en-US&page=${i}`;

        if (mediaType === 'anime') {
            const animeGenreId = 16;
            apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${animeGenreId}&with_original_language=ja&language=en-US&page=${i}`;
        }

        promises.push(fetch(apiUrl).then(response => response.json()));
    }

    const results = await Promise.all(promises);
    const combinedResults: MediaItem[] = results.flatMap(result => result.results);
    const sliceStart = startIndex % tmdbPageSize;
    const items = combinedResults.slice(sliceStart, sliceStart + itemsPerPage);

    // Fetch additional details for each item
    const detailedPromises = items.map(item =>
        fetch(`https://api.themoviedb.org/3/${mediaType === 'anime' ? 'tv' : mediaType}/${item.id}?api_key=${apiKey}&language=en-US&append_to_response=credits`)
            .then(response => response.json())
            .then(data => ({
                ...item,
                runtime: data.runtime,
                genres: data.genres,
                director: data.credits ? data.credits.crew.find((crewMember: CrewMember) => crewMember.job === 'Director')?.name : 'N/A',
                cast: data.credits ? data.credits.cast.slice(0, 15).map((castMember: CastMember) => ({
                    name: castMember.name,
                    character: castMember.character,
                    profile_path: castMember.profile_path
                })) : [],
                tags: data.keywords?.keywords?.map((keyword: Keyword) => keyword.name) || []
            }))
    );

    const detailedItems = await Promise.all(detailedPromises);

    return detailedItems;
};

const fetchRandomFilm = async (): Promise<MediaItem> => {
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const film = data.results[randomIndex];

    const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${film.id}?api_key=${apiKey}&language=en-US&append_to_response=credits`);
    const details = await detailsResponse.json();

    return {
        ...film,
        runtime: details.runtime,
        genres: details.genres,
        director: details.credits ? details.credits.crew.find((crewMember: CrewMember) => crewMember.job === 'Director')?.name : 'N/A',
        cast: details.credits ? details.credits.cast.slice(0, 15).map((castMember: CastMember) => ({
            name: castMember.name,
            character: castMember.character,
            profile_path: castMember.profile_path
        })) : [],
        tags: details.keywords?.keywords?.map((keyword: Keyword) => keyword.name) || []
    };
};

export { fetchMediaItems, fetchRandomFilm };
