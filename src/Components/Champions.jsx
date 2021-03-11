import React, { useState, useEffect } from 'react';

import './Champions.css'

function importAll(r) {
    return r.keys().map(r);
}
const champ = importAll(require.context('../assets/images/champion', false, /\.(png|jpe?g|svg)$/));

//Isolate names and modify the initial state with the updated one
function nameIsolator(arr) {
    const newArr = [];
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
//set the modified object to a variable
const championsArray = nameIsolator(champ)

const Champions = () => {
    //The modified array consists of image, name and boolean value.
    //The modified array of objects as the initial state
    const [isChampClickedObj, setIsChampClickedObj] = useState(championsArray);

    //states to be frequently updated through the method of elements shuffling
    const [champs, setChamps] = useState(isChampClickedObj);
    useEffect(() => {
        //DOM instances of all champion images
        const getChampionsClassName = [...document.getElementsByClassName('champions-img')];
        const modal = document.querySelector('.modal-bg');
        //Initially shuffle the champions
        if (modal !== null) {
            modal.onclick = () => {
                setChamps(shuffleArray());
            }
        }
        getChampionsClassName.forEach((c, i) => {
            c.onclick = () => {
                const shuffle = shuffleArray();
                setChamps(shuffle);
                const name = champs[i].name;
                //The content of className is clicked when the boolean is true
                //The side effects resets the entire object back to zero
                if (champs[i].isClicked) {

                    const resetChamps = isChampClickedObj.map(o =>
                        o.isClicked === true ? { ...o, isClicked: false } : o
                    );
                    setIsChampClickedObj(resetChamps);
                } else {

                    const toggleClicked = isChampClickedObj.map(o =>
                        o.name === name ? { ...o, isClicked: true } : o
                    );
                    setIsChampClickedObj(toggleClicked);
                }
            }
        })

        //shuffle the images
        function shuffleArray() {
            const shuffledChamps = []; //a temporary array
            const champs = isChampClickedObj; //ref to objects of champions
            let currentIndex = champs.length, temporaryValue, randomIndex;
            let maxIndex = 45;

            while (0 !== currentIndex) {

                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                //swap it with the current element.
                temporaryValue = champs[currentIndex];
                champs[currentIndex] = champs[randomIndex];
                champs[randomIndex] = temporaryValue;
            }
            for (let i = 0; i < maxIndex; i++) {
                //increases the number of champions based on specific checkpoint of scores
                //a difficulty aspect of this app
                shuffledChamps.push(champs[i]);
            }
            //generateChamps(shuffledChamps,maxIndex);
            return shuffledChamps;
        }
    }, [champs, isChampClickedObj])
    let iterableChamps = champs;
    const iterationChamps = iterableChamps.map((c, i) => {
        return (
            <div key={i} className="champ">
                <img
                    src={c.img}
                    alt="champion"
                    id={c.name}
                    className={`champions-img ${c.isClicked === true ? 'clicked' : 'not-clicked'}`}
                    draggable="false">
                </img>
                <p className="champions-name">{c.name}</p>
            </div>
        )
    })

    return (
        <div className="champinos">
            {champs !== null ? iterationChamps : null}
        </div>
    );
}

export default Champions;