import React, { useState, useEffect } from 'react';

import './Scores.css'

const Scores = () => {
    //a naive approach of using useRef
    let tempScore = 0;
    let tempScoreRef = React.useRef(tempScore);
    const [score, setScore] = useState(tempScore);
    useEffect(() => {
        const champs = document.querySelectorAll('.champions-img');
        champs.forEach((el) => {
            el.addEventListener('click', incrementScorePerUniqueClick);
        });
        function incrementScorePerUniqueClick(e) {
            const clickedElem = e.target;
            if (clickedElem.classList.contains('not-clicked')) {
                setScore(tempScoreRef.current += 1);
            } else if (clickedElem.classList.contains('clicked')) {
                setScore(tempScoreRef.current = 0);
            }
        }
        //In my own understanding
        //empty array dependency due to unmounting the created eventlistener after side effects is done
        return () => {
            champs.forEach((el) => {
                el.removeEventListener('click', incrementScorePerUniqueClick);
            });
        };
    }, []) 
    const [highscore, setHighscore] = useState(0);

    //get the high score from the local storage once
    useEffect(() => {
        if (localStorage.getItem('storageHighScore') !== null) {
            const savedHighscore = localStorage.getItem('storageHighScore');
            setHighscore(savedHighscore);
        }
    }, [])

    //Update highscore if score is higher than high score
    useEffect(() => {
        if (score > highscore) {
            setHighscore(score);
            localStorage.setItem('storageHighScore', score);
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