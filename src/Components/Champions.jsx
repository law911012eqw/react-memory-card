import React, { useState, useEffect } from 'react';

import './Champions.css'

function importAll(r) {
    return r.keys().map(r);
}
const champ = importAll(require.context('../assets/images/champion', false, /\.(png|jpe?g|svg)$/));

const Champions = () => {
    const [isChampClickedObj, setIsChampClickedObj] = useState([...champ]);
    useEffect(() => {
        const championsArray = nameIsolator(isChampClickedObj)
        console.log(championsArray);
        setIsChampClickedObj(championsArray);

        //Isolate names and modify the initial state with the updated one
        function nameIsolator(arr) {
            const newArr = new Array();
            for (let i = 0; i < arr.length; i++) {
                const defaultLink = arr[i].default; //reference link to the image
                //spltting the string to get the names
                const index = defaultLink.lastIndexOf("/");
                let splitName = defaultLink.substring(index + 1, defaultLink.length);
                splitName = splitName.split('.');
                splitName = splitName[0];

                const newObj = { name: splitName, img: defaultLink, isClicked: false };
                newArr.push(newObj);
            }
            return newArr;
        }
    }, [])
    //states to be frequently updated through the method of elements shuffling
    const [champs, setChamps] = useState(isChampClickedObj);
    useEffect(() => {
        setChamps(isChampClickedObj);
        const getChampionsClassName = [...document.getElementsByClassName('champions-img')];
        const shuffle = shuffleArray(champs);
        getChampionsClassName.forEach(c => {
            c.onclick = () => {
                setChamps(shuffle);
            }
        })

        //shuffle the images
        function shuffleArray(champs) {
            const shuffledChamps = [];
            let currentIndex = champs.length, temporaryValue, randomIndex;
            let maxIndex = 8;
            let score = 0;
            while(0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = champs[currentIndex];
                champs[currentIndex] = champs[randomIndex];
                champs[randomIndex] = temporaryValue;
            }
            for (let i = 0; i < maxIndex; i++){
                //increases the number of champions based on specific checkpoint of scores
                //a difficulty aspect of this app
                if (score > 28 && maxIndex !== 16) {
                    maxIndex += 8;
                } else if (score > 68 && maxIndex !== 24) {
                    maxIndex += 8;
                }
                shuffledChamps.push(champs[i]);
                console.log(shuffledChamps);
            }
            return shuffledChamps;
        }
    })

    const iterateChampions = champs.map((c, i) => {
        return (
            <div key={i} className="champ">
                <img src={c.img} alt="champion" id={c.name} className="champions-img" draggable="false"></img>
                <p className="champions-name">{c.name}</p>
            </div>
        )
    })
    return (
        <div className="champinos">
            {iterateChampions}
        </div>
    );
}

export default Champions;