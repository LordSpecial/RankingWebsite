import React from 'react';
import MediaItem from './MediaItem';

interface MediaGridProps {
    mediaItems: any[];
    mediaType: 'movie' | 'tv' | 'anime';
    itemsPerRow: number;
}

const MediaGrid: React.FC<MediaGridProps> = ({ mediaItems, mediaType, itemsPerRow }) => {
    return (
        <div className={`media-grid grid-cols-${itemsPerRow}`}>
            {mediaItems.map(item => (
                <MediaItem key={item.id} item={item} mediaType={mediaType} />
            ))}
        </div>
    );
};

export default MediaGrid;
