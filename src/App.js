// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import StreamSelection from './components/StreamSelection';
import StreamDetails from './components/StreamDetails';
import QuizGame from './components/QuizGame';
import ResultsScreen from './components/ResultsScreen';
import { streamNames, quizData } from './data/quizData';

// Application states
const SCREENS = {
    LOADING: 'loading',
    SELECTION: 'selection',
    DETAILS: 'details',
    QUIZ: 'quiz',
    RESULTS: 'results',
};

function App() {
    const [screen, setScreen] = useState(SCREENS.LOADING);
    const [selectedStream, setSelectedStream] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizResults, setQuizResults] = useState(null);

    // 1. Loading Screen Transition
    useEffect(() => {
        const timer = setTimeout(() => {
            setScreen(SCREENS.SELECTION);
        }, 5000); // 5-second transition

        return () => clearTimeout(timer);
    }, []);

    // Function to handle stream selection
    const handleStreamSelect = (stream) => {
        setSelectedStream(stream);
        setScreen(SCREENS.DETAILS);
        setUserAnswers({}); // Reset answers for a new quiz
    };

    // Function to start the quiz
    const handleStartQuiz = () => {
        setScreen(SCREENS.QUIZ);
    };

    // Function to handle quiz submission
    const handleSubmitQuiz = (answers) => {
        const data = quizData[selectedStream];
        let correctCount = 0;

        // Calculate results
        data.questions.forEach(q => {
            // NOTE: Assumes the correct answer is always 'B' for the example data
            if (answers[q.id] === q.answer) {
                correctCount += 1;
            }
        });

        const totalQuestions = data.numQuestions;
        const marks = correctCount * 4; // Example: 4 marks per question
        const points = correctCount * 10; // Example: 10 points per question
        const accuracy = (correctCount / totalQuestions) * 100;

        setQuizResults({
            marks: marks,
            points: points,
            accuracy: accuracy.toFixed(2),
            totalQuestions,
            correctCount,
        });

        setScreen(SCREENS.RESULTS);
    };

    // Function to reset and go to selection screen
    const handleReset = () => {
        setSelectedStream(null);
        setQuizResults(null);
        setUserAnswers({});
        setScreen(SCREENS.SELECTION);
    };

    // --- Render Logic ---
    let CurrentScreenComponent;
    if (screen === SCREENS.LOADING) {
        CurrentScreenComponent = <LoadingScreen />;
    } else if (screen === SCREENS.SELECTION) {
        CurrentScreenComponent = (
            <StreamSelection
                streams={streamNames}
                onSelect={handleStreamSelect}
            />
        );
    } else if (screen === SCREENS.DETAILS && selectedStream) {
        CurrentScreenComponent = (
            <StreamDetails
                streamName={selectedStream}
                details={quizData[selectedStream]}
                onStart={handleStartQuiz}
                onBack={handleReset}
            />
        );
    } else if (screen === SCREENS.QUIZ && selectedStream) {
        CurrentScreenComponent = (
            <QuizGame
                questions={quizData[selectedStream].questions}
                timeLimitMinutes={quizData[selectedStream].timeLimitMinutes}
                initialAnswers={userAnswers}
                onSubmit={handleSubmitQuiz}
                onReset={handleReset}
            />
        );
    } else if (screen === SCREENS.RESULTS && quizResults) {
        CurrentScreenComponent = (
            <ResultsScreen
                results={quizResults}
                onRestart={handleReset}
            />
        );
    }

    return (
        <div className="App">
            <header>
                <h1>Quizlet Game</h1>
            </header>
            <main>
                {CurrentScreenComponent}
            </main>
        </div>
    );
}

export default App;