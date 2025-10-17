import React from 'react';

const StreamDetails = ({ streamName, details, onStart, onBack }) => {
    return (
        <div className="stream-details">
            <h2>{streamName} Quiz Details</h2>
            <p className="description">{details.description}</p>

            <div className="details-box">
                <p>⏰ Time Limit: {details.timeLimitMinutes} minutes</p>
                <p>📝 Number of Questions: {details.numQuestions}</p>
                <p>💯 Max Possible Marks/Points: (Calculated based on correct answers)</p>
            </div>

            <div className="action-buttons">
                <button className="btn-back" onClick={onBack}>⬅️ Change Stream</button>
                <button className="btn-start" onClick={onStart}>🚀 Start Quiz</button>
            </div>
        </div>
    );
};

export default StreamDetails;