// src/components/LoadingScreen.js (All-in-One Code with Pastel CSS)

import React from 'react';

/**
 * A visually attractive, full-screen loading component with a pastel theme.
 * @param {string} [message] - Optional loading message.
 */
const LoadingScreen = ({ message = "Preparing your exam..." }) => {
    
    // Pastel Color Palette:
    const PASTEL_MINT = '#B5EAD7';    const SOFT_LILAC = '#C7CEEA';
    const BACKGROUND_PALE = '#F8F8FF'; // Off-white/Ghost White

    return (
        <>
            {/* The CSS for the component */}
            <style>
                {`
                    /* Full-Screen Container and Centering */
                    .loading-container {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100vw;
                        height: 100vh;
                        /* Soft, light background */
                        background-color: ${BACKGROUND_PALE}; 
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        z-index: 9999;
                        color: #555; /* Soft, dark gray text */
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }

                    .loading-screen-content {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 50px 70px;
                        border-radius: 15px;
                        /* Very soft, slightly transparent card background */
                        background: rgba(255, 255, 255, 0.85); 
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                        transition: all 0.5s ease-out;
                    }

                    /* Title Styling */
                    .loading-title {
                        font-size: 3.5rem;
                        font-weight: 700;
                        margin-bottom: 30px;
                        /* Pastel Gradient Text (Mint to Lilac) */
                        background: linear-gradient(45deg, ${PASTEL_MINT}, ${SOFT_LILAC});
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
                        letter-spacing: 2px;
                    }

                    /* Spinner Styling (Animated Loading Symbol) */
                    .spinner-border {
                        width: 70px;
                        height: 70px;
                        border: 7px solid rgba(181, 234, 215, 0.5); /* Mint background */
                        border-top-color: ${PASTEL_MINT}; /* Mint primary color */
                        border-right-color: ${SOFT_LILAC}; /* Lilac secondary color */
                        border-radius: 50%;
                        /* Smoother animation timing function */
                        animation: pastel-spin 1.2s cubic-bezier(0.5, 0.2, 0.5, 0.8) infinite;
                        margin-bottom: 25px;
                    }

                    /* Message Styling */
                    .loading-message {
                        font-size: 1.3rem;
                        font-style: normal;
                        letter-spacing: 0.5px;
                        color: #777;
                        animation: pulse 2s infinite;
                    }

                    /* Keyframes for the Spin Animation */
                    @keyframes pastel-spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    /* Keyframes for the Pulsing Text */
                    @keyframes pulse {
                        0% { opacity: 1; }
                        50% { opacity: 0.7; }
                        100% { opacity: 1; }
                    }
                `}
            </style>

            {/* The HTML structure */}
            <div className="loading-container">
                <div className="loading-screen-content">
                    <h1 className="loading-title">Quiz Master</h1>
                    <div className="spinner-border"></div>
                    <p className="loading-message">{message}</p>
                </div>
            </div>
        </>
    );
};

export default LoadingScreen;