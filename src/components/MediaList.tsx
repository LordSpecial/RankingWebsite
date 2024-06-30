import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../MediaList.css';
import Header from './Header';
import Controls from './Controls';
import MediaGrid from './MediaGrid';
import { MediaItem, CrewMember, CastMember, Keyword } from '../types';

const MediaList: React.FC = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [mediaType, setMediaType] = useState<'movie' | 'tv' | 'anime'>('movie');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [itemsPerRow, setItemsPerRow] = useState(6);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = '4bc70abe225997a36d12ccea148b9f10';
            const tmdbPageSize = 20;
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

            try {
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
                            cast: data.credits ? data.credits.cast.map((castMember: CastMember) => ({
                                name: castMember.name,
                                character: castMember.character
                            })) : [],
                            tags: data.keywords?.keywords?.map((keyword: Keyword) => keyword.name) || []
                        }))
                );

                const detailedItems = await Promise.all(detailedPromises);

                setMediaItems(detailedItems);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page, mediaType, itemsPerPage]);

    const handleNextPage = () => setPage(prevPage => prevPage + 1);

    const handlePrevPage = () => setPage(prevPage => Math.max(prevPage - 1, 1));

    const handleMediaTypeChange = (newType: 'movie' | 'tv' | 'anime') => {
        setMediaType(newType);
        setPage(1);
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        setPage(1);
    };

    const handleItemsPerRowChange = (value: number) => setItemsPerRow(value);

    const handleDarkModeChange = () => {
        setDarkMode(prevMode => !prevMode);
        if (darkMode) {
            document.body.classList.remove('dark-mode');
        } else {
            document.body.classList.add('dark-mode');
        }
    };

    return (
        <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="content-wrapper">
                <Header mediaType={mediaType} />
                <Controls
                    mediaType={mediaType}
                    itemsPerPage={itemsPerPage}
                    itemsPerRow={itemsPerRow}
                    darkMode={darkMode}
                    onMediaTypeChange={handleMediaTypeChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    onItemsPerRowChange={handleItemsPerRowChange}
                    onDarkModeChange={handleDarkModeChange}
                />
                <MediaGrid mediaItems={mediaItems} mediaType={mediaType} itemsPerRow={itemsPerRow} darkMode={darkMode} />
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-primary me-2" onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                    <button className="btn btn-primary" onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default MediaList;
