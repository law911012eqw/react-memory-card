import React, { useState, useEffect } from 'react';
import './Scores.css'

const Scores = () => {
    //a naive approach of using useRef
    let tempScore = 0;
    let tempScoreRef = React.useRef(tempScore);
    const [score, setScore] = useState(tempScore);
    const champsHTMlCollection = document.getElementsByClassName('champions-img');
    useEffect(() => {
        console.log('side effects on score');
        console.log(champsHTMlCollection);
        [].forEach.call(champsHTMlCollection, function (el) {
            el.addEventListener('click', incrementScorePerUniqueClick);
        });
        function incrementScorePerUniqueClick(e) {
            const clickedElem = e.target;
            if (clickedElem.classList.contains('not-clicked')) {
                console.log(e.target);
                setScore(tempScoreRef.current += 1);
            } else if (clickedElem.classList.contains('clicked')) {
                setScore(tempScoreRef.current = 0);
            }
        }
        //No need to unmount event listener due to an empty array dependency. Although it
        //can also be used as an alternative
    },[]) 
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