import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../MediaList.css';
import Header from './Header.tsx';
import Controls from './Controls.tsx';
import MediaGrid from './MediaGrid.tsx';
import { MediaItem, CrewMember, CastMember, Keyword } from '../types.ts';

// Functional component to display the media list
const MediaList: React.FC = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]); // State for media items
    const [mediaType, setMediaType] = useState<'movie' | 'tv' | 'anime'>('movie'); // State for media type
    const [page, setPage] = useState(1); // State for current page
    const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page
    const [itemsPerRow, setItemsPerRow] = useState(6); // State for items per row
    const [darkMode, setDarkMode] = useState(true); // State for dark mode, default to true

    useEffect(() => {
        // Add 'dark-mode' class to the document body when the component mounts
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]); // Re-run effect when darkMode changes

    useEffect(() => {
        // Fetch data from TMDb API when mediaType, page, or itemsPerPage changes
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
                            cast: data.credits ? data.credits.cast.slice(0, 15).map((castMember: CastMember) => ({
                                name: castMember.name,
                                character: castMember.character,
                                profile_path: castMember.profile_path
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

    const handleNextPage = () => setPage(prevPage => prevPage + 1); // Function to handle next page click

    const handlePrevPage = () => setPage(prevPage => Math.max(prevPage - 1, 1)); // Function to handle previous page click

    const handleMediaTypeChange = (newType: 'movie' | 'tv' | 'anime') => {
        setMediaType(newType); // Function to handle media type change
        setPage(1); // Reset to first page
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value); // Function to handle items per page change
        setPage(1); // Reset to first page
    };

    const handleItemsPerRowChange = (value: number) => setItemsPerRow(value); // Function to handle items per row change

    const handleDarkModeChange = () => {
        setDarkMode(prevMode => !prevMode); // Function to toggle dark mode
    };

    return (
        <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
            <div className="content-wrapper">
                {/* Render header component */}
                <Header mediaType={mediaType} />

                {/* Render controls component */}
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

                {/* Render media grid component */}
                <MediaGrid mediaItems={mediaItems} mediaType={mediaType} itemsPerRow={itemsPerRow} darkMode={darkMode} />

                <div className="d-flex justify-content-center mt-4">
                    {/* Render previous button */}
                    <button className="btn btn-primary me-2" onClick={handlePrevPage} disabled={page === 1}>Previous</button>

                    {/* Render next button */}
                    <button className="btn btn-primary" onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default MediaList; // Export the MediaList component
