import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../MediaList.css';
import Header from './Header';
import Controls from './Controls';
import MediaGrid from './MediaGrid';

const MediaList: React.FC = () => {
    const [mediaItems, setMediaItems] = useState([]);
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
                <MediaGrid mediaItems={mediaItems} mediaType={mediaType} itemsPerRow={itemsPerRow} />
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-primary me-2" onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                    <button className="btn btn-primary" onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default MediaList;
