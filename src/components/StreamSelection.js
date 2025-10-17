// src/components/StreamSelection.js
import React from 'react';

const StreamSelection = ({ streams, onSelect }) => {
    return (
        <div className="stream-selection">
            <h2>Select a Quiz Stream</h2>
            <div className="stream-grid">
                {streams.map((stream) => (
                    <button
                        key={stream}
                        className="stream-card"
                        onClick={() => onSelect(stream)}
                    >
                        {stream}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StreamSelection;