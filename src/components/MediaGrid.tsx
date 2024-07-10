import React from 'react';
import MediaItemComponent from './MediaItem';
import { MediaItem } from '../types';

interface MediaGridProps {
    mediaItems: MediaItem[];
    mediaType: 'movie' | 'tv' | 'anime';
    itemsPerRow: number;
}

const MediaGrid: React.FC<MediaGridProps> = ({ mediaItems, mediaType, itemsPerRow }) => (
    <div className={`media-grid grid-cols-${itemsPerRow}`}>
        {mediaItems.map(item => (
            <MediaItemComponent key={item.id} item={item} mediaType={mediaType} />
        ))}
    </div>
);

export default MediaGrid;
