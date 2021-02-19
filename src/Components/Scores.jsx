import React, {useState, useEffect} from 'react';

import './Scores.css'


const Scores = () => {
let [score, setScore] = useState(0);
useEffect(() => {
    window.onclick = () => {
        setScore(score++);
    }
})

const [highscore, setHighscore] = useState(0);
useEffect(() => {
    if(score > highscore){
        setHighscore(score);
    }
})
return (
    <div className="scores">
        <div className="score">
            <p>Score:</p>
            <span>{score}</span>
        </div>
        <div className="high-score">
            <p>High Score:</p>
            <span>{highscore}</span>
        </div>
    </div>
);
}

export default Scores;