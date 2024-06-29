import React from 'react';

interface ControlsProps {
    mediaType: 'movie' | 'tv' | 'anime';
    itemsPerPage: number;
    itemsPerRow: number;
    darkMode: boolean;
    onMediaTypeChange: (newType: 'movie' | 'tv' | 'anime') => void;
    onItemsPerPageChange: (value: number) => void;
    onItemsPerRowChange: (value: number) => void;
    onDarkModeChange: () => void;
}

const Controls: React.FC<ControlsProps> = ({
                                               mediaType,
                                               itemsPerPage,
                                               itemsPerRow,
                                               darkMode,
                                               onMediaTypeChange,
                                               onItemsPerPageChange,
                                               onItemsPerRowChange,
                                               onDarkModeChange
                                           }) => {
    return (
        <div className="row justify-content-between align-items-center mb-4">
            <div className="col-auto">
                <div className="btn-group" role="group">
                    <input type="radio" className="btn-check" name="mediaType" id="movie" checked={mediaType === 'movie'} onChange={() => onMediaTypeChange('movie')} />
                    <label className="btn btn-outline-primary" htmlFor="movie">Movies</label>

                    <input type="radio" className="btn-check" name="mediaType" id="tv" checked={mediaType === 'tv'} onChange={() => onMediaTypeChange('tv')} />
                    <label className="btn btn-outline-primary" htmlFor="tv">TV Shows</label>

                    <input type="radio" className="btn-check" name="mediaType" id="anime" checked={mediaType === 'anime'} onChange={() => onMediaTypeChange('anime')} />
                    <label className="btn btn-outline-primary" htmlFor="anime">Anime</label>
                </div>
            </div>
            <div className="col-auto">
                <label className="me-2">
                    Items per page:
                    <select className="form-select" value={itemsPerPage} onChange={e => onItemsPerPageChange(parseInt(e.target.value, 10))}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </label>
                <label className="me-2">
                    Items per row:
                    <select className="form-select" value={itemsPerRow} onChange={e => onItemsPerRowChange(parseInt(e.target.value, 10))}>
                        <option value={2}>2</option>
                        <option value={4}>4</option>
                        <option value={6}>6</option>
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                    </select>
                </label>
                <label>
                    Dark Mode:
                    <input type="checkbox" className="form-check-input ms-2" checked={darkMode} onChange={onDarkModeChange} />
                </label>
            </div>
        </div>
    );
};

export default Controls;
