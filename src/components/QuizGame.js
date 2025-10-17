// src/components/QuizGame.js
import React, { useState, useEffect } from 'react';

const QuizGame = ({ questions, timeLimitMinutes, initialAnswers, onSubmit, onReset }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(initialAnswers);
    const [timeRemaining, setTimeRemaining] = useState(timeLimitMinutes * 60);

    // Timer logic
    useEffect(() => {
        if (timeRemaining <= 0) {
            // Auto-submit when time is up
            onSubmit(answers);
            return;
        }

        const timer = setTimeout(() => {
            setTimeRemaining(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeRemaining, answers, onSubmit]);

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (questionId, optionKey) => {
        setAnswers(prev => ({ ...prev, [questionId]: optionKey }));
    };

    const handleNext = () => {
        setCurrentQuestionIndex(prev => Math.min(prev + 1, questions.length - 1));
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex(prev => Math.max(prev - 1, 0));
    };

    const handleReset = () => {
        if (window.confirm("Are you sure you want to reset the quiz? All progress will be lost.")) {
            onReset();
        }
    };

    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to submit the quiz? You cannot return after submission.")) {
            onSubmit(answers);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const currentQuestionId = currentQuestion.id;

    return (
        <div className="quiz-container">
            <div className="timer-display">
                ⏳ Time Remaining: {formatTime(timeRemaining)}
            </div>

            {/* 4. Question Display */}
            <div className="quiz-content">
                {/* Left Side: Question Navigation */}
                <div className="question-nav">
                    <h3>Questions ({questions.length})</h3>
                    <div className="nav-grid">
                        {questions.map((q, index) => (
                            <button
                                key={q.id}
                                className={`nav-btn 
                                    ${index === currentQuestionIndex ? 'current' : ''}
                                    ${answers[q.id] ? 'answered' : ''}
                                `}
                                onClick={() => setCurrentQuestionIndex(index)}
                            >
                                {q.id}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Center: Current Question */}
                <div className="current-question">
                    <h3>Question {currentQuestionId} / {questions.length}</h3>
                    <p className="question-text">{currentQuestion.question}</p>

                    <div className="options-list">
                        {Object.entries(currentQuestion.options).map(([key, value]) => (
                            <div
                                key={key}
                                className={`option-item ${answers[currentQuestionId] === key ? 'selected' : ''}`}
                                onClick={() => handleAnswerSelect(currentQuestionId, key)}
                            >
                                <span className="option-key">{key}</span>
                                <span className="option-value">{value}</span>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="question-nav-buttons">
                        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                            ⬅️ Previous
                        </button>
                        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                            Next ➡️
                        </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons full-width">
                        <button className="btn-reset" onClick={handleReset}>
                            🔄 Reset
                        </button>
                        <button className="btn-submit" onClick={handleSubmit}>
                            ✅ Submit Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizGame;