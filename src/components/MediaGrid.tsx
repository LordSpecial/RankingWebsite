import React from 'react';
import MediaItemComponent from './MediaItem';
import { MediaItem } from '../types';

interface MediaGridProps {
    mediaItems: MediaItem[];
    mediaType: 'movie' | 'tv' | 'anime';
    itemsPerRow: number;
    darkMode: boolean;
}

const MediaGrid: React.FC<MediaGridProps> = ({ mediaItems, mediaType, itemsPerRow, darkMode }) => {
    return (
        <div className={`media-grid grid-cols-${itemsPerRow}`}>
            {mediaItems.map(item => (
                <MediaItemComponent key={item.id} item={item} mediaType={mediaType} darkMode={darkMode} />
            ))}
        </div>
    );
};

export default MediaGrid;
