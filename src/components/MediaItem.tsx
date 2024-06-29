import React from 'react';

interface MediaItemProps {
    item: any;
    mediaType: 'movie' | 'tv' | 'anime';
}

const MediaItem: React.FC<MediaItemProps> = ({ item, mediaType }) => {
    return (
        <div className="col">
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
    );
};

export default MediaItem;
