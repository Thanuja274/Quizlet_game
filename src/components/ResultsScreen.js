// src/components/ResultsScreen.js
import React from 'react';

const ResultsScreen = ({ results, onRestart }) => {
    const { marks, points, accuracy, totalQuestions, correctCount } = results;

    return (
        <div className="results-screen">
            <h2>🎉 Quiz Results</h2>

            <div className="score-summary">
                <div className="stat-card">
                    <h3>Total Questions</h3>
                    <p>{totalQuestions}</p>
                </div>
                <div className="stat-card correct">
                    <h3>Correct Answers</h3>
                    <p>{correctCount}</p>
                </div>
                <div className="stat-card accuracy">
                    <h3>Accuracy</h3>
                    <p>
                        {accuracy}%
                    </p>
                </div>
            </div>

            <div className="score-breakdown">
                <p>🏆 Total Points Earned: {points}</p>
                <p>📊 Total Marks: {marks}</p>
            </div>

            <button className="btn-restart" onClick={onRestart}>
                Start New Quiz 🔁
            </button>
        </div>
    );
};

export default ResultsScreen;