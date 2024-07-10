import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/MediaList.css';
import Header from './Header';
import Controls from './Controls';
import MediaGrid from './MediaGrid';
import { MediaItem } from '../types';
import { fetchMediaItems } from '../services/mediaService';

const MediaList: React.FC = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]); // State for media items
    const [mediaType, setMediaType] = useState<'movie' | 'tv' | 'anime'>('movie'); // State for media type
    const [page, setPage] = useState(1); // State for current page
    const [itemsPerPage, setItemsPerPage] = useState(10); // State for items per page
    const [itemsPerRow, setItemsPerRow] = useState(6); // State for items per row

    useEffect(() => {
        const fetchData = async () => {
            try {
                const items = await fetchMediaItems(mediaType, page, itemsPerPage);
                setMediaItems(items);
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

    return (
        <div className="container">
            <div className="content-wrapper">
                <Header mediaType={mediaType} />
                <Controls
                    mediaType={mediaType}
                    itemsPerPage={itemsPerPage}
                    itemsPerRow={itemsPerRow}
                    onMediaTypeChange={handleMediaTypeChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    onItemsPerRowChange={handleItemsPerRowChange}
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
