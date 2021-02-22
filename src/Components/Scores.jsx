import React, { useState, useEffect } from 'react';

import './Scores.css'


const Scores = () => {
    const [score, setScore] = useState(0);
    useEffect(() => {
        console.log('Side effects on score');
        document.addEventListener('click', function (e) {
            const clickedElem = e.target;
            if (clickedElem.classList.contains('not-clicked')) {
                setScore(score + 1);
            } else if (clickedElem.classList.contains('clicked')) {
                console.log('reset score to zero');
                setScore(0);
            }
        });
    })

    const [highscore, setHighscore] = useState(0);
    //get the high score from the local storage once
    useEffect(() => {
        console.log('Get local high score');
        if(localStorage.getItem('storageHighScore') !== null){
            const savedHighscore = localStorage.getItem('storageHighScore');
            setHighscore(savedHighscore);
        }
    }, [])
    //Update highscore if score is higher than high score
    useEffect(() => {
        console.log(`Updated Score: ${score}`);
        if (score > highscore) {
            setHighscore(score);
            localStorage.setItem('storageHighScore', score);
            console.log(`Updated High-Score: ${highscore}`);
        }
    }, [score, highscore])
    return (
        <div className="scores">
            <div className="score">
                <p>Score:</p>
                <span className="score-num">{score}</span>
            </div>
            <div className="high-score">
                <p>High Score:</p>
                <span>{highscore}</span>
            </div>
        </div>
    );
}

export default Scores;