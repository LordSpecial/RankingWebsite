import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../MediaList.css';

interface MediaItem {
    id: number;
    title: string;
    name?: string;
    overview: string;
    poster_path: string;
}

const MediaList: React.FC = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [mediaType, setMediaType] = useState<'movie' | 'tv' | 'anime'>('movie');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [itemsPerRow, setItemsPerRow] = useState(4);

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = '4bc70abe225997a36d12ccea148b9f10'; // TMDb API key
            const tmdbPageSize = 20;
            const startIndex = (page - 1) * itemsPerPage;
            const startPage = Math.floor(startIndex / tmdbPageSize) + 1;
            const endIndex = startIndex + itemsPerPage;
            const endPage = Math.ceil(endIndex / tmdbPageSize);

            const promises = [];
            for (let i = startPage; i <= endPage; i++) {
                let apiUrl = `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${apiKey}&language=en-US&page=${i}`;

                if (mediaType === 'anime') {
                    // Anime genre IDs for TMDb (e.g., 16 for Animation and 18 for Drama, since anime often falls into these categories)
                    const animeGenreId = 16;
                    apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${animeGenreId}&with_original_language=ja&language=en-US&page=${i}`;
                }

                promises.push(fetch(apiUrl).then(response => response.json()));
            }

            try {
                const results = await Promise.all(promises);
                const combinedResults = results.flatMap(result => result.results);
                const sliceStart = startIndex % tmdbPageSize;
                const items = combinedResults.slice(sliceStart, sliceStart + itemsPerPage);
                setMediaItems(items);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page, mediaType, itemsPerPage]);

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleMediaTypeChange = (newType: 'movie' | 'tv' | 'anime') => {
        setMediaType(newType);
        setPage(1); // Reset to first page on media type change
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset to first page on items per page change
    };

    const handleItemsPerRowChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerRow(parseInt(event.target.value, 10));
    };

    return (
        <div className="container">
            <div className="row justify-content-between align-items-center mb-4">
                <div className="col-auto">
                    <div className="btn-group" role="group">
                        <input type="radio" className="btn-check" name="mediaType" id="movie" checked={mediaType === 'movie'} onChange={() => handleMediaTypeChange('movie')} />
                        <label className="btn btn-outline-primary" htmlFor="movie">Movies</label>

                        <input type="radio" className="btn-check" name="mediaType" id="tv" checked={mediaType === 'tv'} onChange={() => handleMediaTypeChange('tv')} />
                        <label className="btn btn-outline-primary" htmlFor="tv">TV Shows</label>

                        <input type="radio" className="btn-check" name="mediaType" id="anime" checked={mediaType === 'anime'} onChange={() => handleMediaTypeChange('anime')} />
                        <label className="btn btn-outline-primary" htmlFor="anime">Anime</label>
                    </div>
                </div>
                <div className="col-auto">
                    <label className="me-2">
                        Items per page:
                        <select className="form-select" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </label>
                    <label>
                        Items per row:
                        <select className="form-select" value={itemsPerRow} onChange={handleItemsPerRowChange}>
                            <option value={2}>2</option>
                            <option value={4}>4</option>
                            <option value={6}>6</option>
                            <option value={8}>8</option>
                            <option value={10}>10</option>
                        </select>
                    </label>
                </div>
            </div>
            <h2 className="mb-4">Top {mediaType === 'movie' ? 'Movies' : mediaType === 'tv' ? 'TV Shows' : 'Anime'}</h2>
            <div className={`row row-cols-1 row-cols-sm-2 row-cols-md-${itemsPerRow} g-4`}>
                {mediaItems.map(item => (
                    <div className="col" key={item.id}>
                        <div className="card h-100">
                            <div className={`position-absolute top-0 start-0 px-2 py-1 ${mediaType === 'movie' ? 'movie-label' : mediaType === 'tv' ? 'tv-label' : 'anime-label'}`}>
                                {mediaType === 'movie' ? 'Movie' : mediaType === 'tv' ? 'TV Show' : 'Anime'}
                            </div>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                className="card-img-top"
                                alt={item.title || item.name}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{item.title || item.name}</h5>
                                <p className="card-text">{item.overview}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary me-2" onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                <button className="btn btn-primary" onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default MediaList;
